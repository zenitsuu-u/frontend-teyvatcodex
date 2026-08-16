import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Weapons from "../pages/Weapons";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Weapons", () => {

    beforeEach(() => {

        vi.spyOn(Storage.prototype, "getItem")
            .mockReturnValue("fake-token");

        global.fetch = vi.fn()
            .mockResolvedValueOnce({
                json: async () => [
                    {
                        id: 1,
                        name: "Engulfing Lightning",
                        slug: "engulfing-lightning",
                        rarity: 5,
                        type: "polearm",
                        icon: "/weapon.png"
                    }
                ]
            })

            .mockResolvedValueOnce({
                json: async () => []
            }) as any;
    });

    it("affiche les armes", async () => {

        render(
            <MemoryRouter>
                <Weapons />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(
                screen.getByText("Engulfing Lightning")
            ).toBeInTheDocument();
        });
    });
});