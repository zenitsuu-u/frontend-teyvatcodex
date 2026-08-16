import { type ChangeEvent, useEffect, useState } from "react";
import ImageUpload from "../../../components/admin/ImageUpload";
import type { Character, Weapon } from "../../../types";

export default function BuildCreate() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);

    const [form, setForm] = useState<{
        character_slug: string;
        weapon_slug: string;
        artifacts: string[];
        sands: string;
        goblet: string;
        circlet: string;
        substats: string[];
        talents: string[];
        synergies: string[];
        image: string;
    }>({
        character_slug: "",
        weapon_slug: "",
        artifacts: [],
        sands: "",
        goblet: "",
        circlet: "",
        substats: [],
        talents: [],
        synergies: [],
        image: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/admin/characters", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
            .then((res) => res.json())
            .then((data: Character[]) => setCharacters(data));

        fetch(`${import.meta.env.VITE_API_URL}/admin/weapons", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
            .then((res) => res.json())
            .then((data: Weapon[]) => setWeapons(data));
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/builds", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Erreur lors de la création");

            setMessage("✅ Build créé avec succès");

            setForm({
                character_slug: "",
                weapon_slug: "",
                artifacts: [],
                sands: "",
                goblet: "",
                circlet: "",
                substats: [],
                talents: [],
                synergies: [],
                image: "",
            });
        } catch (err: any) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1 style={{ fontFamily: "Cinzel, serif", color: "#d4af37" }}>
                Créer un build
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
                <select
                    name="character_slug"
                    value={form.character_slug}
                    onChange={handleChange}
                >
                    <option value="">Choisir un personnage</option>
                    {characters.map((c) => (
                        <option key={c.slug} value={c.slug}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select
                    name="weapon_slug"
                    value={form.weapon_slug}
                    onChange={handleChange}
                >
                    <option value="">Choisir une arme</option>
                    {weapons.map((w) => (
                        <option key={w.slug} value={w.slug}>
                            {w.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="artifacts"
                    placeholder="Artefacts (séparés par des virgules)"
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            artifacts: e.target.value.split(",").map((s) => s.trim()),
                        }))
                    }
                />

                <input type="text" name="sands" placeholder="Sablier" onChange={handleChange} />
                <input type="text" name="goblet" placeholder="Coupe" onChange={handleChange} />
                <input type="text" name="circlet" placeholder="Couronne" onChange={handleChange} />

                <input
                    type="text"
                    name="substats"
                    placeholder="Substats (séparées par des virgules)"
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            substats: e.target.value.split(",").map((s) => s.trim()),
                        }))
                    }
                />

                <input
                    type="text"
                    name="talents"
                    placeholder="Priorité des talents (ex: Burst > Skill > Auto)"
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            talents: e.target.value.split(">").map((s) => s.trim()),
                        }))
                    }
                />


                <input
                    type="text"
                    name="synergies"
                    placeholder="Synergies (séparées par des virgules)"
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            synergies: e.target.value.split(",").map((s) => s.trim()),
                        }))
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

                {message && <p>{message}</p>}
            </form>
        </div>
    );
}