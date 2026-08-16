import { useState } from "react";
import type { ChangeEvent } from "react";
import ImageUpload from "../../../components/admin/ImageUpload";

export default function WeaponCreate() {
    const [form, setForm] = useState({
        name: "",
        slug: "",
        type: "",
        rarity: 3,
        atk: "",
        secondary: "",
        description: "",
        effect: "",
        icon: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "rarity" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/weapons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erreur lors de la création");

            setMessage("Arme créée avec succès");

            setForm({
                name: "",
                slug: "",
                type: "",
                rarity: 3,
                atk: "",
                secondary: "",
                description: "",
                effect: "",
                icon: "",
                image: "",
            });

        } catch (err: any) {
            setMessage("Erreur serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1 style={{ fontFamily: "Cinzel, serif" }}>Créer une arme</h1>

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
                />

                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                />

                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="">Choisir un type</option>
                    <option value="sword">Épée</option>
                    <option value="claymore">Claymore</option>
                    <option value="polearm">Arme d'hast</option>
                    <option value="bow">Arc</option>
                    <option value="catalyst">Catalyseur</option>
                </select>

                <select name="rarity" value={form.rarity} onChange={handleChange}>
                    <option value={3}>3★</option>
                    <option value={4}>4★</option>
                    <option value={5}>5★</option>
                </select>

                <input
                    type="number"
                    name="atk"
                    placeholder="ATK de base"
                    value={form.atk}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="secondary"
                    placeholder="Stat secondaire (ex: CRIT Rate%)"
                    value={form.secondary}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                />

                <textarea
                    name="effect"
                    placeholder="Effet / Passif"
                    value={form.effect}
                    onChange={handleChange}
                    rows={3}
                />

                <ImageUpload
                    label="Icône"
                    onUpload={(url: string) =>
                        setForm((prev) => ({ ...prev, icon: url }))
                    }
                />

                <ImageUpload
                    label="Image"
                    onUpload={(url: string) =>
                        setForm((prev) => ({ ...prev, image: url }))
                    }
                />

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
                    }}
                >
                    {loading ? "Création..." : "Créer"}
                </button>

                {message && (
                    <p style={{ marginTop: "10px", color: "#d4af37" }}>{message}</p>
                )}
            </form>
        </div>
    );
}