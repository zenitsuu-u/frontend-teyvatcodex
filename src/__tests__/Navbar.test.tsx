import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("Navbar", () => {

    it("affiche les liens", () => {

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByText(/accueil/i))
            .toBeInTheDocument();
    });
});