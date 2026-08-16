import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Characters from "../pages/Characters";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Characters", () => {

    beforeEach(() => {

        vi.spyOn(Storage.prototype, "getItem")
            .mockReturnValue("fake-token");

        global.fetch = vi.fn()
            .mockResolvedValueOnce({
                json: async () => [
                    {
                        id: 1,
                        name: "Diluc",
                        slug: "diluc",
                        element: "pyro",
                        rarity: 5,
                        icon: "/diluc.png"
                    }
                ]
            })

            .mockResolvedValueOnce({
                json: async () => []
            }) as any;
    });

    it("affiche les personnages", async () => {

        render(
            <MemoryRouter>
                <Characters />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Diluc"))
                .toBeInTheDocument();
        });
    });
});