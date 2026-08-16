import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import ImageUpload from "../../../components/admin/ImageUpload";

type Material = {
    item: string;
    quantity: number;
};

export default function WeaponEdit() {
    const { slug } = useParams<{ slug: string }>();

    const [form, setForm] = useState<any>(null);
    const [ascensionMaterials, setAscensionMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;

        fetch(`http://${import.meta.env.VITE_API_URL}/admin/weapons/${slug}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Erreur serveur");
                }
                return res.json();
            })
            .then((data) => {
                setForm(data);
                setAscensionMaterials(data.ascensionMaterials || []);
            })
            .catch((err) => setError("❌ " + err.message));
    }, [slug]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (!form) return;
        const { name, value } = e.target;
        setForm((prev: any) => ({
            ...prev,
            [name]: name === "rarity" ? Number(value) : value,
        }));
    };

    const handleMaterialChange = (index: number, field: keyof Material, value: string) => {
        setAscensionMaterials((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: field === "quantity" ? Number(value) : value,
            };
            return updated;
        });
    };

    const addMaterial = () => {
        setAscensionMaterials((prev) => [...prev, { item: "", quantity: 1 }]);
    };

    const removeMaterial = (index: number) => {
        setAscensionMaterials((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch(`http://${import.meta.env.VITE_API_URL}/admin/weapons/${slug}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({ ...form, ascensionMaterials }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erreur lors de la mise à jour");

            setMessage("✅ Arme mise à jour");
        } catch (err: any) {
            setError("❌ " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#1e293b",
        color: "white",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
    };

    if (error && !form) return <p style={{ color: "white" }}>{error}</p>;
    if (!form) return <p style={{ color: "white" }}>Chargement...</p>;

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1 style={{ fontFamily: "Cinzel, serif" }}>Modifier : {form.name}</h1>

            {message && <p style={{ color: "#d4af37" }}>{message}</p>}
            {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "600px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                }}
            >
                <input type="text" name="name" value={form.name} onChange={handleChange} style={inputStyle} placeholder="Nom" />
                <input type="text" name="slug" value={form.slug} onChange={handleChange} style={inputStyle} placeholder="Slug" />

                <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
                    <option value="sword">Épée</option>
                    <option value="claymore">Claymore</option>
                    <option value="polearm">Arme d'hast</option>
                    <option value="bow">Arc</option>
                    <option value="catalyst">Catalyseur</option>
                </select>

                <select name="rarity" value={form.rarity} onChange={handleChange} style={inputStyle}>
                    <option value={3}>3★</option>
                    <option value={4}>4★</option>
                    <option value={5}>5★</option>
                </select>

                <input type="number" name="atk" placeholder="ATK de base" value={form.atk ?? ""} onChange={handleChange} style={inputStyle} />
                <input type="text" name="secondary" placeholder="Stat secondaire" value={form.secondary ?? ""} onChange={handleChange} style={inputStyle} />
                <textarea name="description" value={form.description ?? ""} onChange={handleChange} rows={4} style={inputStyle} placeholder="Description" />
                <textarea name="effect" value={form.effect ?? ""} onChange={handleChange} rows={4} style={inputStyle} placeholder="Effet / Passif" />

                <ImageUpload
                    label="Icône"
                    onUpload={(url: string) => setForm((p: any) => ({ ...p, icon: url }))}
                />
                {form.icon && (
                    <img
                        src={form.icon.startsWith("http") ? form.icon : `http://${import.meta.env.VITE_API_URL}${form.icon}`}
                        alt="icon preview"
                        style={{ width: "60px", borderRadius: "6px" }}
                    />
                )}

                <ImageUpload
                    label="Image"
                    onUpload={(url: string) => setForm((p: any) => ({ ...p, image: url }))}
                />
                {form.image && (
                    <img
                        src={form.image.startsWith("http") ? form.image : `http://${import.meta.env.VITE_API_URL}${form.image}`}
                        alt="image preview"
                        style={{ width: "120px", borderRadius: "6px" }}
                    />
                )}

                {/* Matériaux d'ascension */}
                <div>
                    <h3 style={{ fontFamily: "Cinzel, serif", color: "#d4af37", marginBottom: "10px" }}>
                        Matériaux d'ascension
                    </h3>

                    {ascensionMaterials.map((mat, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginBottom: "10px",
                                alignItems: "center",
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Nom du matériau"
                                value={mat.item}
                                onChange={(e) => handleMaterialChange(index, "item", e.target.value)}
                                style={{ ...inputStyle, flex: 2 }}
                            />
                            <input
                                type="number"
                                placeholder="Quantité"
                                value={mat.quantity}
                                min={1}
                                onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                                style={{ ...inputStyle, flex: 1 }}
                            />
                            <button
                                type="button"
                                onClick={() => removeMaterial(index)}
                                style={{
                                    background: "transparent",
                                    border: "1px solid #ff6b6b",
                                    color: "#ff6b6b",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addMaterial}
                        style={{
                            background: "transparent",
                            border: "1px solid #d4af37",
                            color: "#d4af37",
                            padding: "8px 14px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        + Ajouter un matériau
                    </button>
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
            </form>
        </div>
    );
}