import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OfflinePage from "./page";

describe("OfflinePage", () => {
  it("shows the offline message and a retry link to home", () => {
    render(<OfflinePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Sin conexión" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reintentar" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
