import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TalentSelector from "../components/TalentSelector.tsx";
import ConstellationSelector from "../components/ConstellationSelector.tsx";

export default function CharacterDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFav, setIsFav] = useState(false);

    const sectionTitleStyle: React.CSSProperties = {
        fontFamily: "Cinzel, serif",
        fontWeight: 700,
        fontSize: "1.4rem",
        letterSpacing: "0.03em",
        background: "linear-gradient(90deg, #e2c97e, #f0e2b0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "6px"
    };

    const dividerStyle: React.CSSProperties = {
        width: "60px",
        height: "4px",
        borderRadius: "4px",
        background: "linear-gradient(90deg, #e2c97e, #f0e2b0)",
        marginBottom: "16px"
    };

    const infoLabel: React.CSSProperties = {
        fontFamily: "Cinzel, serif",
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: "#e2c97e",
        marginBottom: "10px"
    };

    const infoValue: React.CSSProperties = {
        color: "white",
        fontWeight: 400,
        marginLeft: "6px"
    };

    useEffect(() => {
        fetch(`http://${import.meta.env.VITE_API_URL}/characters/${slug}/details`)
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(() => {
                setData(null);
                setLoading(false);
            });
    }, [slug]);

    useEffect(() => {
        async function checkFav() {
            if (!token) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const favs = await res.json();

                setIsFav(
                    favs.some(
                        (f: any) =>
                            f.type === "character" &&
                            f.target_id === slug
                    )
                );
            } catch (err) {
                console.error(err);
            }
        }

        checkFav();
    }, [token, slug]);

    const toggleFavorite = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            if (!isFav) {
                await fetch(`${import.meta.env.VITE_API_URL}/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        type: "character",
                        target_id: slug
                    })
                });

                setIsFav(true);
            } else {
                await fetch(`http://${import.meta.env.VITE_API_URL}/favorites/${slug}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setIsFav(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <p style={{ color: "white", padding: "20px" }}>
                Chargement...
            </p>
        );
    }

    if (!data) {
        return (
            <div style={{ color: "white", padding: "20px" }}>
                <p>Personnage introuvable.</p>

                <button
                    onClick={() => navigate("/characters")}
                    style={{
                        marginTop: "12px",
                        padding: "8px 14px",
                        background: "#1e293b",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Retour
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", color: "white" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >
                <button
                    onClick={() => navigate("/characters")}
                    style={{
                        padding: "8px 12px",
                        background: "#1e293b",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    ← Retour
                </button>

                <button
                    onClick={toggleFavorite}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "32px",
                        color: isFav ? "#facc15" : "#d4af37"
                    }}
                >
                    {isFav ? "★" : "☆"}
                </button>
            </div>

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                <img
                    src={data.icon?.startsWith("http")
                        ? data.icon
                        : `http://${import.meta.env.VITE_API_URL}${data.icon}`}
                    alt={data.name}
                    style={{
                        width: "160px",
                        borderRadius: "16px",
                        marginBottom: "14px",
                        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
                    }}
                />

                <h1
                    style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "2rem",
                        marginBottom: "8px"
                    }}
                >
                    {data.name}
                </h1>

                <p
                    style={{
                        color: "#f0e2b0",
                        fontSize: "15px"
                    }}
                >
                    {data.region} • {data.element?.toUpperCase()} • {"★".repeat(data.rarity)}
                </p>
            </div>

            <section style={{ marginBottom: "30px" }}>
                <h2 style={sectionTitleStyle}>
                    Informations
                </h2>

                <div style={dividerStyle}></div>

                <div
                    style={{
                        background: "#1e293b",
                        borderRadius: "14px",
                        padding: "18px"
                    }}
                >
                    <p style={infoLabel}>
                        Élément :
                        <span style={infoValue}>
                            {data.element}
                        </span>
                    </p>

                    <p style={infoLabel}>
                        Arme :
                        <span style={infoValue}>
                            {data.weapon}
                        </span>
                    </p>

                    <p style={infoLabel}>
                        Rareté :
                        <span style={infoValue}>
                            {"★".repeat(data.rarity)}
                        </span>
                    </p>

                    <p style={infoLabel}>
                        Région :
                        <span style={infoValue}>
                            {data.region}
                        </span>
                    </p>

                    <p style={infoLabel}>
                        Description :
                        <span style={infoValue}>
                            {data.description}
                        </span>
                    </p>
                </div>
            </section>

            <section style={{ marginBottom: "30px" }}>
                <h2 style={sectionTitleStyle}>
                    Stats
                </h2>

                <div style={dividerStyle}></div>

                <div
                    style={{
                        background: "#1e293b",
                        padding: "14px",
                        borderRadius: "12px"
                    }}
                >
                    {data.stats?.map((s: any) => (
                        <div
                            key={s.level}
                            style={{
                                marginBottom: "14px",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                paddingBottom: "10px"
                            }}
                        >
                            <strong style={{ color: "#f0e2b0" }}>
                                Niveau {s.level}
                            </strong>

                            <p>
                                HP: {s.hp} • ATK: {s.atk} • DEF: {s.def}
                            </p>

                            {s.ascension_stat && (
                                <p>
                                    {s.ascension_stat}: {s.ascension_value}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ marginBottom: "30px" }}>
                <h2 style={sectionTitleStyle}>
                    Talents
                </h2>

                <div style={dividerStyle}></div>

                <TalentSelector talents={data.talents} />
            </section>

            <section style={{ marginBottom: "30px" }}>
                <h2 style={sectionTitleStyle}>
                    Constellations
                </h2>

                <div style={dividerStyle}></div>

                <ConstellationSelector constellations={data.constellations} />
            </section>

            {[
                {
                    title: "Matériaux d'ascension",
                    materials: data.materials?.ascension || []
                },
                {
                    title: "Matériaux de talents",
                    materials: data.materials?.talent || []
                }
            ].map((section, index) => (
                <section
                    key={index}
                    style={{ marginBottom: "30px" }}
                >
                    <h2 style={sectionTitleStyle}>
                        {section.title}
                    </h2>

                    <div style={dividerStyle}></div>

                    {section.materials.length === 0 && (
                        <p>
                            Aucun matériau renseigné.
                        </p>
                    )}

                    {section.materials.map((m: any, i: number) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 16px",
                                marginBottom: "10px",
                                background: "#1e293b",
                                borderRadius: "12px"
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Cinzel, serif",
                                    fontWeight: 600,
                                    color: "#e2c97e"
                                }}
                            >
                                {m.item}
                            </span>

                            <span
                                style={{
                                    fontWeight: "bold",
                                    color: "#f0e2b0"
                                }}
                            >
                                ×{m.quantity}
                            </span>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
}