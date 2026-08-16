import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import BuildEdit from "../pages/admin/Builds/BuildEdit.tsx";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useParams: () => ({ id: "1" })
    };
});

describe("BuildEdit", () => {
    test("charge le formulaire", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    character_slug: "ayaka",
                    weapon_slug: "mistsplitter",
                    artifacts: [],
                    substats: [],
                    talents: [],
                    synergies: []
                })
            }) as any
        );

        render(
            <MemoryRouter>
                <BuildEdit />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/arme/i)).toBeInTheDocument();
        });
    });
});