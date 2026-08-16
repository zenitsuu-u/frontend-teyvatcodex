import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Character = {
    id: number;
    name: string;
    slug: string;
    element: string;
    stars: number;
    icon: string;
};

const elements = [
    "pyro",
    "hydro",
    "anemo",
    "electro",
    "cryo",
    "geo",
    "dendro"
];

const elementLabels: Record<string, string> = {
    pyro: "Pyro",
    hydro: "Hydro",
    anemo: "Anémo",
    electro: "Électro",
    cryo: "Cryo",
    geo: "Géo",
    dendro: "Dendro"
};

const getElementColor = (element: string) => {
    switch (element) {
        case "pyro":
            return "#ef4444";
        case "hydro":
            return "#3b82f6";
        case "anemo":
            return "#4FD1C5";
        case "cryo":
            return "#7dd3fc";
        case "electro":
            return "#a855f7";
        case "geo":
            return "#eab308";
        case "dendro":
            return "#22c55e";
        default:
            return "#1e293b";
    }
};

export default function PublicBuildList() {

    const [characters, setCharacters] = useState<Character[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    const [selectedElement, setSelectedElement] =
        useState<string | null>(null);

    const [selectedRarity, setSelectedRarity] =
        useState<number | null>(null);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/characters`)
            .then(res => res.json())
            .then((data) => {

                const list: Character[] = data.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    slug: c.slug,
                    element: c.element,
                    stars: c.rarity,
                    icon: c.icon
                }));

                setCharacters(list);
            })
            .catch(err => console.error(err));
    }, []);

    const loadFavorites = async () => {
        if (!token) return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/favorites",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();

            const favSlugs = data
                .filter((f: any) => f.type === "build")
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

                await fetch(`${import.meta.env.VITE_API_URL}/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        type: "build",
                        target_id: slug
                    })
                });

                setFavorites(prev => [...prev, slug]);

            }

            else {

                await fetch(
                    `http://${import.meta.env.VITE_API_URL}/favorites/${slug}`,
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

    const toggleElement = (el: string) =>
        setSelectedElement(prev =>
            prev === el ? null : el
        );

    const toggleRarity = (r: number) =>
        setSelectedRarity(prev =>
            prev === r ? null : r
        );

    const filteredCharacters = characters.filter(c =>
        (selectedElement === null ||
            c.element === selectedElement) &&

        (selectedRarity === null ||
            c.stars === selectedRarity)
    );

    return (
        <div style={{
            padding: "20px",
            color: "white"
        }}>

            <h1>Builds recommandés</h1>

            <div style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "15px"
            }}>
                {elements.map(el => (
                    <button
                        key={el}
                        onClick={() => toggleElement(el)}
                        style={{
                            background:
                                selectedElement === el
                                    ? getElementColor(el)
                                    : "#1e293b",

                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {elementLabels[el]}
                    </button>
                ))}
            </div>

            <div style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px"
            }}>
                {[4, 5].map(r => (
                    <button
                        key={r}
                        onClick={() => toggleRarity(r)}
                        style={{
                            background:
                                selectedRarity === r
                                    ? "#facc15"
                                    : "#1e293b",

                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {r}★
                    </button>
                ))}
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px"
            }}>

                {filteredCharacters.map(c => (

                    <div
                        key={c.id}
                        onClick={() =>
                            navigate(`/build/${c.slug}`)
                        }
                        style={{
                            position: "relative",
                            borderRadius: "16px",
                            overflow: "hidden",

                            border:
                                `2px solid ${getElementColor(c.element)}`,

                            boxShadow:
                                `0 0 12px ${getElementColor(c.element)}`,

                            height: "220px",
                            cursor: "pointer",
                            background: "#0f172a"
                        }}
                    >

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFav(c.slug);
                            }}
                            style={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                fontSize: "28px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",

                                color:
                                    favorites.includes(c.slug)
                                        ? "gold"
                                        : "#ffffff",

                                zIndex: 10
                            }}
                        >
                            {favorites.includes(c.slug)
                                ? "★"
                                : "☆"}
                        </button>

                        <img
                            src={c.icon?.startsWith("http") ? c.icon : `http://${import.meta.env.VITE_API_URL}${c.icon}`}
                            alt={c.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />

                        <div style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            padding: "10px",

                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",

                            color: "white"
                        }}>

                            <h3 style={{
                                margin: 0,
                                fontSize: "14px"
                            }}>
                                {c.name}
                            </h3>

                            <div style={{
                                fontSize: "12px",
                                color: "#facc15"
                            }}>
                                {"★".repeat(c.stars)}
                            </div>

                            <p style={{
                                fontSize: "12px",
                                margin: 0
                            }}>
                                {elementLabels[c.element] ?? c.element}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}