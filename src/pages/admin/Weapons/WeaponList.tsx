import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Weapon } from "../../../types";

export default function WeaponList() {
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/admin/weapons", {
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
            .then((data: Weapon[]) => setWeapons(data))
            .catch((err) => setError("❌ " + err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (slug: string) => {
        if (!confirm("Supprimer cette arme ?")) return;

        try {
            const res = await fetch(`http://${import.meta.env.VITE_API_URL}/admin/weapons/${slug}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Erreur lors de la suppression");

            setWeapons((prev) => prev.filter((w) => w.slug !== slug));
            setMessage("🗑️ Arme supprimée");
        } catch (err: any) {
            setError("❌ " + err.message);
        }
    };

    if (loading) {
        return <p style={{ color: "white" }}>Chargement...</p>;
    }

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1 style={{ fontFamily: "Cinzel, serif", marginBottom: "20px" }}>
                Liste des armes
            </h1>

            {error && (
                <p style={{ marginBottom: "15px", fontWeight: 600, color: "#ff6b6b" }}>
                    {error}
                </p>
            )}

            {message && (
                <p style={{ marginBottom: "15px", fontWeight: 600, color: "#d4af37" }}>
                    {message}
                </p>
            )}

            {weapons.length === 0 ? (
                <p>Aucune arme trouvée.</p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "#1e293b",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <thead>
                    <tr style={{ background: "#111827", color: "#d4af37" }}>
                        <th style={{ padding: "12px" }}>Icône</th>
                        <th style={{ padding: "12px" }}>Nom</th>
                        <th style={{ padding: "12px" }}>Type</th>
                        <th style={{ padding: "12px" }}>Rareté</th>
                        <th style={{ padding: "12px" }}>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {weapons.map((w) => (
                        <tr
                            key={w.slug}
                            style={{
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                textAlign: "center",
                            }}
                        >
                            <td style={{ padding: "10px" }}>
                                <img
                                    src={w.icon.startsWith("http") ? w.icon : `${import.meta.env.VITE_API_URL}${w.icon}`}
                                    alt={w.name}
                                    style={{ width: "50px", borderRadius: "6px" }}
                                />
                            </td>

                            <td style={{ padding: "10px" }}>{w.name}</td>
                            <td style={{ padding: "10px" }}>{w.type}</td>
                            <td style={{ padding: "10px" }}>{w.rarity}★</td>

                            <td style={{ padding: "10px" }}>
                                <Link
                                    to={`/admin/weapons/edit/${w.slug}`}
                                    style={{
                                        marginRight: "10px",
                                        color: "#d4af37",
                                        fontWeight: 600,
                                    }}
                                >
                                    Modifier
                                </Link>

                                <button
                                    onClick={() => handleDelete(w.slug)}
                                    style={{
                                        background: "transparent",
                                        border: "1px solid #d4af37",
                                        color: "#d4af37",
                                        padding: "6px 10px",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        transition: "0.2s",
                                    }}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}