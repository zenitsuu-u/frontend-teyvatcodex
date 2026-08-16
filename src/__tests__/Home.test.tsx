import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

describe("Home", () => {
    test("affiche la page home", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(
            screen.getByText(/Bienvenue, Voyageur/i)
        ).toBeInTheDocument();
    });
});