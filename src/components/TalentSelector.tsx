import { useState } from "react";

type Talent = {
    type: string;
    name: string;
    description: string;
};

type Props = {
    talents: Talent[];
};

export default function TalentSelector({ talents }: Props) {
    const [selected, setSelected] = useState(0);

    const typeLabels: Record<string, string> = {
        normal: "Attaque normale",
        skill: "Compétence élémentaire",
        burst: "Déchaînement élémentaire",
        passive: "Aptitude passive"
    };

    const icons: Record<string, string> = {
        normal: "/src/assets/talents/normal.png",
        skill: "/src/assets/talents/skill.png",
        burst: "/src/assets/talents/burst.png",
        passive: "/src/assets/talents/passive.png"
    };

    const t = talents[selected];

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginBottom: "20px"
                }}
            >
                {talents.map((talent, i) => (
                    <div
                        key={i}
                        onClick={() => setSelected(i)}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: selected === i ? "3px solid #facc15" : "2px solid #334155",
                            cursor: "pointer",
                            transition: "0.2s",
                            background: "#1e293b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <img
                            src={icons[talent.type]}
                            alt={talent.type}
                            style={{ width: "70%", height: "70%", objectFit: "contain" }}
                        />
                    </div>
                ))}
            </div>

            <div
                style={{
                    background: "#0f172a",
                    padding: "15px",
                    borderRadius: "12px",
                    border: "1px solid #334155"
                }}
            >
                <div style={{ opacity: 0.7, fontSize: "12px" }}>
                    {typeLabels[t.type] ?? t.type}
                </div>

                <h3 style={{ margin: "5px 0" }}>{t.name}</h3>

                <p style={{ margin: 0, lineHeight: "1.4" }}>
                    {t.description}
                </p>
            </div>
        </div>
    );
}