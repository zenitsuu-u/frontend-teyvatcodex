import { render, screen } from "@testing-library/react";
import BuildField from "../components/BuildField";

describe("BuildField", () => {
    test("affiche le label", () => {
        render(
            <BuildField
                label="Arme"
                value="Mistsplitter"
            />
        );

        expect(
            screen.getByText("Arme")
        ).toBeInTheDocument();
    });

    test("affiche la valeur", () => {
        render(
            <BuildField
                label="Arme"
                value="Mistsplitter"
            />
        );

        expect(
            screen.getByText("Mistsplitter")
        ).toBeInTheDocument();
    });

    test("accepte les nombres", () => {
        render(
            <BuildField
                label="Crit Rate"
                value={95}
            />
        );

        expect(
            screen.getByText("95")
        ).toBeInTheDocument();
    });
});