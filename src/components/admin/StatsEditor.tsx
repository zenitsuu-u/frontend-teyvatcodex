import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";

export type AscensionStat = {
    name: string;
    value: number;
};

export type Stat = {
    level: number;
    hp: number;
    atk: number;
    def: number;

    ascensionStat: AscensionStat;
};

type StatsEditorProps = {
    value?: Stat[];
    onChange: (stats: Stat[]) => void;
};

export default function StatsEditor({
                                        value = [],
                                        onChange,
                                    }: StatsEditorProps) {

    const [stats, setStats] = useState<Stat[]>(value);

    useEffect(() => {
        setStats(value);
    }, [value]);

    const inputStyle: CSSProperties = {
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#111827",
        color: "white",
        fontSize: "14px",
        outline: "none",
    };

    const cardStyle: CSSProperties = {
        background: "#1f2937",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    };

    const updateAll = (updated: Stat[]) => {
        setStats(updated);
        onChange(updated);
    };

    const addStat = () => {
        const newStat: Stat = {
            level: 0,
            hp: 0,
            atk: 0,
            def: 0,

            ascensionStat: {
                name: "",
                value: 0,
            },
        };

        updateAll([...stats, newStat]);
    };

    const removeStat = (index: number) => {
        const updated = stats.filter(
            (_, i) => i !== index
        );

        updateAll(updated);
    };

    const updateStat = (
        index: number,
        field: keyof Omit<Stat, "ascensionStat">,
        value: number
    ) => {

        const updated = [...stats];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        updateAll(updated);
    };

    const updateAscension = (
        index: number,
        field: keyof AscensionStat,
        value: string | number
    ) => {

        const updated = [...stats];

        updated[index] = {
            ...updated[index],

            ascensionStat: {
                ...updated[index].ascensionStat,
                [field]: value,
            },
        };

        updateAll(updated);
    };

    const handleNumberChange = (
        e: ChangeEvent<HTMLInputElement>,
        callback: (value: number) => void
    ) => {

        const value = Number(e.target.value);

        callback(isNaN(value) ? 0 : value);
    };

    return (
        <div style={{ marginTop: "20px" }}>

            <h3
                style={{
                    color: "#d4af37",
                    marginBottom: "16px",
                    fontFamily: "Cinzel, serif",
                    fontSize: "22px",
                }}
            >
                Stats
            </h3>

            {stats.map((s, index) => (
                <div
                    key={index}
                    style={cardStyle}
                >

                    <h4
                        style={{
                            color: "#d4af37",
                            margin: 0,
                        }}
                    >
                        Niveau {s.level || index + 1}
                    </h4>

                    <input
                        type="number"
                        placeholder="Niveau"
                        value={s.level}
                        onChange={(e) =>
                            handleNumberChange(
                                e,
                                (value) =>
                                    updateStat(
                                        index,
                                        "level",
                                        value
                                    )
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        placeholder="HP"
                        value={s.hp}
                        onChange={(e) =>
                            handleNumberChange(
                                e,
                                (value) =>
                                    updateStat(
                                        index,
                                        "hp",
                                        value
                                    )
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        placeholder="ATK"
                        value={s.atk}
                        onChange={(e) =>
                            handleNumberChange(
                                e,
                                (value) =>
                                    updateStat(
                                        index,
                                        "atk",
                                        value
                                    )
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        placeholder="DEF"
                        value={s.def}
                        onChange={(e) =>
                            handleNumberChange(
                                e,
                                (value) =>
                                    updateStat(
                                        index,
                                        "def",
                                        value
                                    )
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        placeholder="Stat d’ascension"
                        value={s.ascensionStat.name}
                        onChange={(e) =>
                            updateAscension(
                                index,
                                "name",
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        placeholder="Valeur ascension"
                        value={s.ascensionStat.value}
                        onChange={(e) =>
                            handleNumberChange(
                                e,
                                (value) =>
                                    updateAscension(
                                        index,
                                        "value",
                                        value
                                    )
                            )
                        }
                        style={inputStyle}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            removeStat(index)
                        }
                        style={{
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addStat}
                style={{
                    background: "#d4af37",
                    color: "#111827",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontWeight: 700,
                }}
            >
                + Ajouter une stat
            </button>
        </div>
    );
}