import { useState } from "react";
import type { ChangeEvent } from "react";

type ImageUploadProps = {
    label: string;
    onUpload: (url: string) => void;
};

const API_URL = `${import.meta.env.VITE_API_URL}";

export default function ImageUpload({
                                        label,
                                        onUpload,
                                    }: ImageUploadProps) {
    const [preview, setPreview] = useState<string>("");

    const handleFile = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
            `${API_URL}/admin/uploads`,
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token"),
                },
                body: formData,
            }
        );

        const data = await res.json();

        const relativeUrl = data.url;

        setPreview(`${API_URL}${relativeUrl}`);

        onUpload(relativeUrl);
    };

    return (
        <div style={{ marginBottom: "15px" }}>
            <label htmlFor="image-upload">{label}</label>

            <input
                id="image-upload"
                type="file"
                onChange={handleFile}
            />

            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    style={{
                        width: "120px",
                        marginTop: "10px",
                        borderRadius: "5px",
                    }}
                />
            )}
        </div>
    );
}