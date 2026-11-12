import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { listByOwner, resetDb } from "@/data";
import { DEMO_USERS, setSession } from "@/features/session/session-store";
import { saveDraft } from "./wizard-state";
import { COMPLETE } from "./wizard-state.test";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
const { PublishWizardContainer: PublishWizard } =
  await import("./publish-wizard");

beforeEach(() => {
  localStorage.clear();
  resetDb();
  push.mockClear();
  setSession(DEMO_USERS.tenant);
});

describe("PublishWizard", () => {
  it("blocks Siguiente until the step is valid and keeps data when going back", () => {
    render(<PublishWizard />);
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(
      screen.getByText("Selecciona el tipo de inmueble"),
    ).toBeInTheDocument();
    expect(screen.getByText("Paso 1 de 6")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Casa" }));
    fireEvent.change(screen.getByLabelText("Ciudad"), {
      target: { value: "Medellín" },
    });
    fireEvent.change(screen.getByLabelText("Barrio"), {
      target: { value: "Laureles" },
    });
    fireEvent.change(screen.getByLabelText("Dirección"), {
      target: { value: "Cra 70 # 1-2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(screen.getByText("Paso 2 de 6")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Atrás" }));
    expect(screen.getByLabelText("Ciudad")).toHaveValue("Medellín");
    expect(
      JSON.parse(localStorage.getItem("habi.publishDraft.u-tenant-1")!).state
        .city,
    ).toBe("Medellín");
  });

  it("applies quick successive updates without losing any", () => {
    render(<PublishWizard />);
    fireEvent.click(screen.getByRole("button", { name: "Casa" }));
    fireEvent.change(screen.getByLabelText("Ciudad"), {
      target: { value: "Cali" },
    });
    fireEvent.change(screen.getByLabelText("Barrio"), {
      target: { value: "Granada" },
    });
    fireEvent.change(screen.getByLabelText("Dirección"), {
      target: { value: "Av 9N # 10-20" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    fireEvent.click(screen.getByRole("button", { name: "Más habitaciones" }));
    fireEvent.click(screen.getByRole("button", { name: "Piscina" }));
    fireEvent.click(screen.getByRole("button", { name: "Terraza" }));
    const saved = JSON.parse(
      localStorage.getItem("habi.publishDraft.u-tenant-1")!,
    ).state;
    expect(saved).toMatchObject({
      type: "house",
      city: "Cali",
      bedrooms: 3,
      amenities: ["piscina", "terraza"],
    });
  });

  it("submits a restored draft as pending_review and clears it", async () => {
    saveDraft("u-tenant-1", { step: 5, state: COMPLETE });
    render(<PublishWizard />);
    expect(screen.getByText("Paso 6 de 6")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Enviar a revisión" }));
    await vi.waitFor(() => expect(push).toHaveBeenCalled());
    const mine = await listByOwner("u-tenant-1");
    const created = mine.find((p) => p.title === COMPLETE.title)!;
    expect(created.status).toBe("pending_review");
    expect(push).toHaveBeenCalledWith(`/me/properties?created=${created.id}`);
    expect(localStorage.getItem("habi.publishDraft.u-tenant-1")).toBeNull();
  });
});
