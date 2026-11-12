import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetDb } from "@/data";

let search = "";
const push = vi.fn((url: string) => {
  search = url.split("?")[1] ?? "";
});
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(search),
}));

const { ListingsView } = await import("./listings-view");

beforeEach(() => {
  search = "";
  push.mockClear();
  localStorage.clear();
  resetDb();
});

describe("ListingsView", () => {
  it("shows only approved properties as cards linking to the detail", async () => {
    render(<ListingsView />);
    const links = await screen.findAllByRole("link");
    expect(links.length).toBe(18);
    expect(links[0]).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/properties\/p-\d+/),
    );
    expect(screen.queryByText(/Suba \(borrador\)/)).not.toBeInTheDocument();
    expect(screen.getByText("18 resultados")).toBeInTheDocument();
  });

  it("applies URL filters and shows the empty state", async () => {
    search = "q=cartagena";
    const { unmount } = render(<ListingsView />);
    expect(await screen.findByText("2 resultados")).toBeInTheDocument();
    unmount();

    search = "q=narnia";
    render(<ListingsView />);
    expect(
      await screen.findByText("No encontramos inmuebles"),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Limpiar filtros" }));
    expect(push).toHaveBeenCalledWith("/", { scroll: false });
  });

  it("writes the type filter to the URL", async () => {
    render(<ListingsView />);
    await screen.findAllByRole("link");
    const group = screen.getByRole("radiogroup", { name: "Tipo de inmueble" });
    fireEvent.click(within(group).getByRole("radio", { name: "Casas" }));
    expect(push).toHaveBeenCalledWith("/?type=house", { scroll: false });
  });
});
