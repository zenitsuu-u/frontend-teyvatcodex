import { describe, test, expect, vi } from "vitest";

describe("API", () => {
    test("mock fetch fonctionne", async () => {
        const fakeData = [{ id: 1, name: "Ayaka" }];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeData)
            }) as any
        );

        const res = await fetch(`${import.meta.env.VITE_API_URL}/characters`);

        const data = await res.json();

        expect(data[0].name).toBe("Ayaka");
    });
});