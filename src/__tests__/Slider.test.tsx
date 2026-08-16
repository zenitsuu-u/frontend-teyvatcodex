import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../components/Slider";

describe("Slider", () => {
    const items = [
        {
            image: "/test1.webp",
            title: "Ayaka",
            subtitle: "Cryo DPS"
        },
        {
            image: "/test2.webp",
            title: "Raiden",
            subtitle: "Electro Archon"
        }
    ];

    test("affiche les slides", () => {
        render(<Slider items={items} />);

        expect(screen.getByText("Ayaka")).toBeInTheDocument();
        expect(screen.getByText("Raiden")).toBeInTheDocument();
    });

    test("change de slide avec les flèches", () => {
        render(<Slider items={items} autoPlay={false} />);

        const buttons = screen.getAllByRole("button");

        fireEvent.click(buttons[1]);

        expect(screen.getByText("Raiden")).toBeInTheDocument();
    });
});