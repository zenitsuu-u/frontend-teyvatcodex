import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuildField from "../components/BuildField";

type Build = {
    id: number;
    character_slug: string;
    weapon_slug: string;
    artifacts: string[];
    stats_priority: string[];
    description: string;
    sands: string;
    goblet: string;
    circlet: string;
    substats: string[];
    talents: string[];
    synergies: string[];
    image?: string;
};

export default function BuildDetails() {
    const { slug } = useParams<{ slug: string }>();
    const [build, setBuild] = useState<Build | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;

        setLoading(true);
        setError("");

        fetch(`${import.meta.env.VITE_API_URL}/builds/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error("Build introuvable");
                return res.json();
            })
            .then((data: Build) => setBuild(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [slug]);

    if (!slug) {
        return <p style={{ color: "white", padding: 20 }}>Aucun personnage sélectionné.</p>;
    }

    if (loading) {
        return <p style={{ color: "white", padding: 20 }}>Chargement...</p>;
    }

    if (error || !build) {
        return (
            <p style={{ color: "white", padding: 20 }}>
                Aucun build disponible pour ce personnage.
            </p>
        );
    }

    return (
        <div style={{ padding: 20, color: "white" }}>
            <h1
                style={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    textAlign: "center",
                    margin: "0 auto 25px auto",
                    background: "linear-gradient(90deg, #e2c97e, #f0e2b0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    maxWidth: "90%",
                    lineHeight: "1.3",
                    fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                    wordBreak: "break-word",
                }}
            >
                Build recommandé — {slug.replace(/-/g, " ")}
            </h1>

            {build.image && (
                <img
                    src={`${import.meta.env.VITE_API_URL}${build.image}`}
                    alt="Build"
                    style={{
                        width: "100%",
                        maxWidth: 600,
                        margin: "20px auto",
                        display: "block",
                        borderRadius: "12px",
                        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                    }}
                />
            )}

            {build.description && (
                <p style={{ color: "#9ca3af", marginBottom: 20, textAlign: "center" }}>
                    {build.description}
                </p>
            )}

            <h2 style={{ fontFamily: "Cinzel", marginTop: 30, marginBottom: 10 }}>
                Arme
            </h2>
            <BuildField label="Arme" value={build.weapon_slug} />

            <h2 style={{ fontFamily: "Cinzel", marginTop: 30, marginBottom: 10 }}>
                Artéfacts
            </h2>
            {build.artifacts?.map((a: string) => (
                <BuildField key={a} label="Artéfact" value={a} />
            ))}

            <h2 style={{ fontFamily: "Cinzel", marginTop: 30, marginBottom: 10 }}>
                Stats principales
            </h2>
            <BuildField label="Sablier" value={build.sands} />
            <BuildField label="Coupe" value={build.goblet} />
            <BuildField label="Couronne" value={build.circlet} />

            <h2 style={{ fontFamily: "Cinzel", marginTop: 30, marginBottom: 10 }}>
                Substats
            </h2>
            <BuildField label="Substats" value={build.substats?.join(" / ")} />

            <h2 style={{ fontFamily: "Cinzel", marginTop: 30, marginBottom: 10 }}>
                Priorité des talents
            </h2>
            <BuildField label="Talents" value={build.talents?.join(" > ")} />

            <h2 style={{ fontFamily: "Cinzel", marginTop: 30, marginBottom: 10 }}>
                Synergies
            </h2>
            {build.synergies?.map((s: string) => (
                <BuildField key={s} label="Synergie" value={s} />
            ))}
        </div>
    );
}