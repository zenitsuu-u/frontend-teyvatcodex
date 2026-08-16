import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Weapon = {
    id: number;
    name: string;
    slug: string;
    type: string;
    rarity: number;
    icon: string;
};

const getRarityColor = (rarity: number) => {
    switch (rarity) {
        case 5:
            return "#facc15";
        case 4:
            return "#a855f7";
        case 3:
            return "#3b82f6";
        default:
            return "#94a3b8";
    }
};

export default function Weapons() {

    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/weapons`)
            .then(res => res.json())
            .then((data) => {
                setWeapons(data);
            })
            .catch(err => console.error(err));
    }, []);

    const loadFavorites = async () => {

        if (!token) return;

        try {

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/favorites`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();

            const favSlugs = data
                .filter((f: any) => f.type === "weapon")
                .map((f: any) => f.target_id);

            setFavorites(favSlugs);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, [token]);

    const toggleFav = async (slug: string) => {

        if (!token) return;

        const isFav = favorites.includes(slug);

        try {

            if (!isFav) {

                await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        type: "weapon",
                        target_id: slug
                    })
                });

                setFavorites(prev => [...prev, slug]);
            }
            else {

                await fetch(
                    `${import.meta.env.VITE_API_URL}/favorites/${slug}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setFavorites(prev =>
                    prev.filter(f => f !== slug)
                );
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2
                style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    letterSpacing: "0.03em",

                    background:
                        "linear-gradient(90deg, #e2c97e, #f0e2b0)",

                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",

                    marginBottom: "6px"
                }}
            >
                Armes
            </h2>

            <div
                style={{
                    width: "70px",
                    height: "4px",
                    borderRadius: "4px",

                    background:
                        "linear-gradient(90deg, #e2c97e, #f0e2b0)",

                    marginBottom: "20px"
                }}
            />

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(270px, 1fr))",

                    gap: "20px"
                }}
            >

                {weapons.map(w => (

                    <div
                        key={w.id}
                        style={{
                            position: "relative"
                        }}
                    >

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toggleFav(w.slug);
                            }}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                zIndex: 20,

                                background: "none",
                                border: "none",
                                cursor: "pointer",

                                fontSize: "28px",

                                color:
                                    favorites.includes(w.slug)
                                        ? "gold"
                                        : "white"
                            }}
                        >
                            {favorites.includes(w.slug)
                                ? "★"
                                : "☆"}
                        </button>

                        <Link
                            to={`/weapons/${w.slug}`}
                            style={{
                                textDecoration: "none"
                            }}
                        >

                            <div
                                style={{
                                    background: "#1e293b",

                                    padding: "14px",

                                    borderRadius: "14px",

                                    textAlign: "center",

                                    color: "white",

                                    border:
                                        `2px solid ${getRarityColor(w.rarity)}`,

                                    boxShadow:
                                        `0 0 14px ${getRarityColor(w.rarity)}`,

                                    transition:
                                        "transform 0.2s ease, box-shadow 0.2s ease",

                                    overflow: "hidden"
                                }}

                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement)
                                        .style.transform = "scale(1.03)";

                                    (e.currentTarget as HTMLElement)
                                        .style.boxShadow =
                                        `0 0 20px ${getRarityColor(w.rarity)}`;
                                }}

                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement)
                                        .style.transform = "scale(1)";

                                    (e.currentTarget as HTMLElement)
                                        .style.boxShadow =
                                        `0 0 14px ${getRarityColor(w.rarity)}`;
                                }}
                            >

                                <img
                                    src={w.icon.startsWith("http") ? w.icon : `${import.meta.env.VITE_API_URL}${w.icon}`}
                                    alt={w.name}
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        objectFit: "contain",
                                        marginBottom: "12px"
                                    }}
                                />

                                <h3
                                    style={{
                                        fontFamily: "Cinzel, serif",
                                        fontSize: "1rem",

                                        marginBottom: "8px",

                                        color:
                                            getRarityColor(w.rarity)
                                    }}
                                >
                                    {w.name}
                                </h3>

                                <p style={{
                                    margin: "4px 0",
                                    opacity: 0.9
                                }}>
                                    Type :{" "}
                                    <span style={{
                                        color: "#f0e2b0"
                                    }}>
                                        {w.type}
                                    </span>
                                </p>

                                {/* RARITY */}

                                <p style={{
                                    margin: "4px 0",
                                    opacity: 0.9
                                }}>
                                    Rareté :{" "}

                                    <span
                                        style={{
                                            color:
                                                getRarityColor(w.rarity),

                                            fontWeight: 700
                                        }}
                                    >
                                        {"★".repeat(w.rarity)}
                                    </span>
                                </p>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
