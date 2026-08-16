import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import ImageUpload from "../../../components/admin/ImageUpload";
import type { Build, Character, Weapon } from "../../../types";

export default function BuildEdit() {
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<Build | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const normalize = (value: any): string[] => {
        if (!value) return [];

        if (Array.isArray(value)) {
            return value
                .map((v) => String(v).replace(/^"|"$/g, "").trim())
                .filter(Boolean);
        }

        if (typeof value === "string") {
            try {
                const parsed = JSON.parse(value);
                if (Array.isArray(parsed)) {
                    return parsed
                        .map((v) => String(v).replace(/^"|"$/g, "").trim())
                        .filter(Boolean);
                }
                if (typeof parsed === "string") {
                    return [parsed.trim()].filter(Boolean);
                }
            } catch {
                return value
                    .split(",")
                    .map((s) => s.replace(/^"|"$/g, "").trim())
                    .filter(Boolean);
            }
        }

        return Object.values(value)
            .map((v) => String(v).replace(/^"|"$/g, "").trim())
            .filter(Boolean);
    };

    useEffect(() => {
        if (!id) return;

        fetch(`${import.meta.env.VITE_API_URL}/admin/builds/${id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
            .then((res) => res.json())
            .then((data: Build) => {
                setForm({
                    ...data,
                    weapon_slug: data.weapon_slug,
                    artifacts: normalize(data.artifacts),
                    substats: normalize(data.substats),
                    talents: normalize(data.talents),
                    synergies: normalize(data.synergies),
                });
            });

        fetch(`${import.meta.env.VITE_API_URL}/admin/characters", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
            .then((res) => res.json())
            .then((data: Character[]) => setCharacters(data));

        fetch(`${import.meta.env.VITE_API_URL}/admin/weapons`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
            .then((res) => res.json())
            .then((data: Weapon[]) => setWeapons(data));
    }, [id]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (!form) return;
        const { name, value } = e.target;
        setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleArrayChange = (
        e: ChangeEvent<HTMLInputElement>,
        field: keyof Build,
        separator: string = ","
    ) => {
        const values = e.target.value
            .split(separator)
            .map((s) => s.trim());
        setForm((prev) => (prev ? { ...prev, [field]: values } : prev));
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!form) return;
        console.log("FORMULAIRE ENVOYÉ :", form);
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/builds/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erreur lors de la mise à jour");
            setMessage("✅ Build mis à jour avec succès");
        } catch (err: any) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!form) {
        return <p style={{ color: "white" }}>Chargement...</p>;
    }

    const character = characters.find((c) => c.slug === form.character_slug);

    const inputStyle: React.CSSProperties = {
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #374151",
        background: "#1f2937",
        color: "white",
        fontSize: "14px",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
    };

    const labelStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        fontSize: "13px",
        color: "#9ca3af",
        fontFamily: "sans-serif",
    };

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1 style={{ fontFamily: "Cinzel, serif", color: "#d4af37" }}>
                Modifier le build de : {character?.name || form.character_slug}
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
                <label style={labelStyle}>
                    Personnage
                    <select
                        name="character_slug"
                        value={form.character_slug || ""}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        {characters.map((c) => (
                            <option key={c.slug} value={c.slug}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={labelStyle}>
                    Arme
                    <select
                        name="weapon_slug"
                        value={form.weapon_slug || ""}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        {weapons.map((w) => (
                            <option key={w.slug} value={w.slug}>
                                {w.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={labelStyle}>
                    Artefacts{" "}
                    <span style={{ color: "#6b7280", fontSize: "11px" }}>
            (séparés par des virgules)
          </span>
                    <input
                        type="text"
                        name="artifacts"
                        value={form.artifacts?.join(", ") || ""}
                        placeholder="Ex: Gladiator, Shimenawa"
                        onChange={(e) => handleArrayChange(e, "artifacts", ",")}
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Sablier
                    <input
                        type="text"
                        name="sands"
                        value={form.sands || ""}
                        placeholder="Ex: ATK%"
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Coupe
                    <input
                        type="text"
                        name="goblet"
                        value={form.goblet || ""}
                        placeholder="Ex: Pyro DMG Bonus"
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Couronne
                    <input
                        type="text"
                        name="circlet"
                        value={form.circlet || ""}
                        placeholder="Ex: Crit Rate"
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Substats{" "}
                    <span style={{ color: "#6b7280", fontSize: "11px" }}>
            (séparées par des virgules)
          </span>
                    <input
                        type="text"
                        name="substats"
                        value={form.substats?.join(", ") || ""}
                        placeholder="Ex: Crit Rate, Crit DMG, ATK%"
                        onChange={(e) => handleArrayChange(e, "substats", ",")}
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Priorité des talents{" "}
                    <span style={{ color: "#6b7280", fontSize: "11px" }}>
            (séparés par &gt;)
          </span>
                    <input
                        type="text"
                        name="talents"
                        value={form.talents?.join(" > ") || ""}
                        placeholder="Ex: Burst > Skill > Auto"
                        onChange={(e) => handleArrayChange(e, "talents", ">")}
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Synergies{" "}
                    <span style={{ color: "#6b7280", fontSize: "11px" }}>
            (séparées par des virgules)
          </span>
                    <input
                        type="text"
                        name="synergies"
                        value={form.synergies?.join(", ") || ""}
                        placeholder="Ex: Bennett, Xingqiu"
                        onChange={(e) => handleArrayChange(e, "synergies", ",")}
                        style={inputStyle}
                    />
                </label>

                <ImageUpload
                    label="Image"
                    onUpload={(url: string) =>
                        setForm((prev) => (prev ? { ...prev, image: url } : prev))
                    }
                />

                {form.image && (
                    <img
                        src={
                            form.image.trim().startsWith("http")
                                ? form.image.trim()
                                : `${import.meta.env.VITE_API_URL}${form.image.trim()}`
                        }
                        alt="Build preview"
                        style={{ width: "200px", borderRadius: "10px", marginTop: "10px" }}
                    />
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                        background: loading ? "#92702a" : "#d4af37",
                        color: "#111827",
                        fontWeight: 700,
                        fontSize: "15px",
                        transition: "background 0.2s",
                    }}
                >
                    {loading ? "Mise à jour..." : "Mettre à jour"}
                </button>

                {message && (
                    <p
                        style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            background: message.startsWith("✅") ? "#052e16" : "#2d0f0f",
                            color: message.startsWith("✅") ? "#4ade80" : "#f87171",
                            margin: 0,
                        }}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}