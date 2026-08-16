import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ImageUpload from "../components/admin/ImageUpload";
import { vi } from "vitest";

describe("ImageUpload", () => {
    test("upload une image", async () => {
        const onUpload = vi.fn();

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    url: "/uploads/test.webp"
                })
            }) as any
        );

        render(
            <ImageUpload
                label="Image"
                onUpload={onUpload}
            />
        );

        const input = screen.getByLabelText(/image/i);

        const file = new File(
            ["test"],
            "test.webp",
            {
                type: "image/webp"
            }
        );

        fireEvent.change(input, {
            target: {
                files: [file]
            }
        });

        await waitFor(() => {
            expect(onUpload).toHaveBeenCalled();
        });
    });
});