import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import ImageUpload from "../../../components/admin/ImageUpload";

type Character = {
    name: string;
    slug: string;
    element: string;
    weapon: string;
    rarity: number;
    region: string;
    description: string;
    icon: string;
    image: string;
};

export default function CharacterEdit() {
    const { slug } = useParams<{ slug: string }>();

    const [form, setForm] = useState<Character | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!slug) return;

        fetch(`${import.meta.env.VITE_API_URL}/admin/characters/`,${slug}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data: Character) => setForm(data))
            .catch(() => setMessage("❌ Impossible de charger le personnage"));
    }, [slug]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (!form) return;

        const { name, value } = e.target;

        setForm((prev) =>
            prev
                ? {
                    ...prev,
                    [name]: name === "rarity" ? Number(value) : value,
                }
                : prev
        );
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/characters/`,${slug}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erreur lors de la mise à jour");
            }

            setMessage("✅ Personnage mis à jour avec succès");
        } catch (err: any) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#1e293b",
        color: "white",
        fontSize: "14px",
    };

    const labelStyle: React.CSSProperties = {
        marginBottom: "8px",
        fontWeight: 600,
    };

    const previewStyle: React.CSSProperties = {
        width: "100px",
        marginTop: "10px",
        borderRadius: "10px",
        objectFit: "cover",
    };

    if (!form) {
        return <p style={{ color: "white" }}>Chargement...</p>;
    }

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1 style={{ marginBottom: "20px", fontFamily: "Cinzel, serif" }}>
                Modifier : {form.name}
            </h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "600px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                }}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <select
                    name="element"
                    value={form.element}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Choisir un élément</option>
                    <option value="pyro">Pyro</option>
                    <option value="hydro">Hydro</option>
                    <option value="anemo">Anémo</option>
                    <option value="electro">Électro</option>
                    <option value="cryo">Cryo</option>
                    <option value="geo">Géo</option>
                    <option value="dendro">Dendro</option>
                </select>

                <input
                    type="text"
                    name="weapon"
                    placeholder="Arme"
                    value={form.weapon}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <select
                    name="rarity"
                    value={form.rarity}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value={4}>4★</option>
                    <option value={5}>5★</option>
                </select>

                <input
                    type="text"
                    name="region"
                    placeholder="Région"
                    value={form.region}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                />

                <div>
                    <p style={labelStyle}>Icône</p>

                    <ImageUpload
                        label="Upload icône"
                        onUpload={(url: string) =>
                            setForm((prev) => (prev ? { ...prev, icon: url } : prev)) // ✅ icon
                        }
                    />
                    {form.icon && (
                        <img
                            src={form.icon.startsWith("http") ? form.icon : `${import.meta.env.VITE_API_URL}${form.icon}`}
                            alt="Icon preview"
                            style={previewStyle}
                        />
                    )}
                    
                    <ImageUpload
                        label="Upload image"
                        onUpload={(url: string) =>
                            setForm((prev) => (prev ? { ...prev, image: url } : prev)) // ✅ image
                        }
                    />
                    {form.image && (
                        <img
                            src={form.image.startsWith("http") ? form.image : `${import.meta.env.VITE_API_URL}${form.image}`}
                            alt="Image preview"
                            style={{ ...previewStyle, width: "220px" }}
                        />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        background: "#d4af37",
                        color: "#111827",
                        fontWeight: 700,
                        fontSize: "15px",
                    }}
                >
                    {loading ? "Mise à jour..." : "Mettre à jour"}
                </button>

                {message && (
                    <p style={{ marginTop: "10px", fontWeight: 600 }}>{message}</p>
                )}
            </form>
        </div>
    );
}