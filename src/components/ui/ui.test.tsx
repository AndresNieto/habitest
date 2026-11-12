import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Avatar, Button, Input, Select, StatusBadge } from "./index";

describe("ui components", () => {
  it("Button defaults to type=button and handles clicks", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Guardar</Button>);
    const btn = screen.getByRole("button", { name: "Guardar" });
    expect(btn).toHaveAttribute("type", "button");
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("Input links label, and exposes the error to assistive tech", () => {
    render(<Input label="Precio" error="Requerido" />);
    const input = screen.getByLabelText("Precio");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Requerido");
  });

  it("Select renders placeholder and options", () => {
    render(
      <Select
        label="Tipo"
        placeholder="Selecciona"
        options={[{ value: "house", label: "Casa" }]}
      />,
    );
    const select = screen.getByLabelText("Tipo");
    expect(select).toHaveDisplayValue("Selecciona");
    expect(screen.getByRole("option", { name: "Casa" })).toBeInTheDocument();
  });

  it("StatusBadge shows the Spanish label for each status", () => {
    render(<StatusBadge status="pending_review" />);
    expect(screen.getByText("En revisión")).toBeInTheDocument();
  });

  it("Avatar falls back to initials with an accessible name", () => {
    render(<Avatar name="Laura Gómez" />);
    expect(screen.getByRole("img", { name: "Laura Gómez" })).toHaveTextContent(
      "LG",
    );
  });
});
