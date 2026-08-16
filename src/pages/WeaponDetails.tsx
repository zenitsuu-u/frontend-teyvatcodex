import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type AscensionMaterial = {
    id: number;
    item: string;
    quantity: number;
};

type Weapon = {
    id: number;
    name: string;
    slug: string;
    type: string;
    rarity: number;
    atk: number | null;
    secondary: string | null;
    effect: any;
    ascensionMaterials: AscensionMaterial[];
    icon: string;
    image: string;
};

function formatEffect(effect: any) {
    if (!effect) {
        return <p style={{ color: "white", opacity: 0.7 }}>Aucun effet</p>;
    }

    if (typeof effect === "string") {
        return (
            <p style={{ marginTop: "10px", opacity: 0.9, color: "white" }}>
                {effect}
            </p>
        );
    }

    if (!Array.isArray(effect)) {
        return <p style={{ opacity: 0.7, color: "white" }}>Aucun effet détaillé</p>;
    }

    const [_titleId, _descId, values] = effect;

    if (!Array.isArray(values)) {
        return <p style={{ opacity: 0.7, color: "white" }}>Aucun effet détaillé</p>;
    }

    return (
        <div style={{ marginTop: "10px" }}>
            <p style={{ color: "#e2c97e", fontFamily: "Cinzel", marginBottom: "8px", fontSize: "1.1rem" }}>
                Effet passif (niveaux 1 → 5)
            </p>
            {values.map((v: any, i: number) => (
                <p key={i} style={{ margin: "4px 0", opacity: 0.9, color: "white" }}>
                    <strong style={{ color: "#f0e2b0" }}>Niveau {i + 1}</strong> :{" "}
                    {Array.isArray(v) ? v.join(" / ") : String(v)}
                </p>
            ))}
        </div>
    );
}

function formatMaterials(mats: AscensionMaterial[]) {
    if (!mats || mats.length === 0) {
        return <p style={{ opacity: 0.7, color: "white" }}>Aucun matériau renseigné</p>;
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "10px" }}>
            {mats.map((mat) => (
                <div
                    key={mat.id}
                    style={{
                        background: "#0f172a",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid rgba(226,201,126,0.25)",
                        color: "white",
                        fontFamily: "Cinzel",
                        minWidth: "180px",
                    }}
                >
                    <p style={{ margin: 0, fontWeight: 600 }}>{mat.item}</p>
                    <p style={{ margin: 0, opacity: 0.8, fontSize: "13px" }}>
                        Quantité : {mat.quantity}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default function WeaponDetails() {
    const { slug } = useParams<{ slug: string }>();
    const [weapon, setWeapon] = useState<Weapon | null>(null);

    const sectionTitleStyle: React.CSSProperties = {
        fontFamily: "Cinzel, serif",
        fontWeight: 700,
        fontSize: "1.4rem",
        letterSpacing: "0.03em",
        background: "linear-gradient(90deg, #e2c97e, #f0e2b0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "6px",
    };

    const dividerStyle: React.CSSProperties = {
        width: "60px",
        height: "4px",
        borderRadius: "4px",
        background: "linear-gradient(90deg, #e2c97e, #f0e2b0)",
        marginBottom: "16px",
    };

    const infoLabel: React.CSSProperties = {
        fontFamily: "Cinzel, serif",
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: "#e2c97e",
        marginBottom: "10px",
    };

    const infoValue: React.CSSProperties = {
        color: "white",
        fontWeight: 400,
        marginLeft: "6px",
    };

    useEffect(() => {
        if (!slug) return;

        fetch(`http://localhost:3000/weapon/${slug}`)
            .then((res) => res.json())
            .then((data: Weapon) => {
                if (!data.ascensionMaterials) data.ascensionMaterials = [];
                setWeapon(data);
            });
    }, [slug]);

    if (!weapon)
        return <p style={{ color: "white", padding: "20px" }}>Chargement...</p>;

    const imageUrl = weapon.image?.startsWith("http")
        ? weapon.image
        : `http://localhost:3000${weapon.image}`;

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <img
                    src={imageUrl}
                    alt={weapon.name}
                    style={{
                        width: "160px",
                        marginBottom: "14px",
                        filter: "drop-shadow(0 0 12px rgba(226,201,126,0.4))",
                    }}
                />
                <h1 style={{ fontFamily: "Cinzel, serif", fontSize: "2rem", marginBottom: "8px" }}>
                    {weapon.name}
                </h1>
                <p style={{ color: "#f0e2b0", fontSize: "15px" }}>
                    {weapon.type} • {"★".repeat(weapon.rarity)}
                </p>
            </div>

            <section style={{ marginBottom: "30px" }}>
                <h2 style={sectionTitleStyle}>Informations</h2>
                <div style={dividerStyle} />
                <div style={{ background: "#1e293b", borderRadius: "14px", padding: "18px" }}>
                    <p style={infoLabel}>
                        Type : <span style={infoValue}>{weapon.type}</span>
                    </p>
                    <p style={infoLabel}>
                        Rareté :{" "}
                        <span style={{ ...infoValue, color: "#f0e2b0", fontWeight: 700 }}>
                            {"★".repeat(weapon.rarity)}
                        </span>
                    </p>
                    <p style={infoLabel}>
                        ATK de base : <span style={infoValue}>{weapon.atk ?? "—"}</span>
                    </p>
                    <p style={infoLabel}>
                        Stat secondaire : <span style={infoValue}>{weapon.secondary ?? "—"}</span>
                    </p>
                </div>
            </section>

            <section style={{ marginBottom: "30px" }}>
                <h2 style={sectionTitleStyle}>Effet</h2>
                <div style={dividerStyle} />
                <div style={{ background: "#1e293b", borderRadius: "14px", padding: "18px" }}>
                    {formatEffect(weapon.effect)}
                </div>
            </section>

            <section style={{ marginBottom: "30px" }}>
                <h2 style={sectionTitleStyle}>Matériaux d'ascension</h2>
                <div style={dividerStyle} />
                <div style={{ background: "#1e293b", borderRadius: "14px", padding: "18px" }}>
                    {formatMaterials(weapon.ascensionMaterials)}
                </div>
            </section>
        </div>
    );
}