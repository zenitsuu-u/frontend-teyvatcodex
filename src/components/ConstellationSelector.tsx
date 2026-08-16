import { useState } from "react";

type Constellation = {
  level: number;
  name: string;
  description: string;
};

type Props = {
  constellations: Constellation[];
};

export default function ConstellationSelector({ constellations }: Props) {
    const [selected, setSelected] = useState(0);

    if (!constellations || constellations.length === 0) {
        return (
            <div style={{ padding: "10px", opacity: 0.7 }}>
                Aucune constellation disponible.
            </div>
        );
    }

    const icons: Record<number, string> = {
        1: "/src/assets/constellations/c1.png",
        2: "/src/assets/constellations/c2.png",
        3: "/src/assets/constellations/c3.png",
        4: "/src/assets/constellations/c4.png",
        5: "/src/assets/constellations/c5.png",
        6: "/src/assets/constellations/c6.png"
    };

    const c = constellations[selected];


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
        {constellations.map((cons, i) => (
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
              src={icons[cons.level]}
              alt={`C${cons.level}`}
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
        <h3 style={{ margin: "5px 0" }}>
          C{c.level} — {c.name}
        </h3>

        <p style={{ margin: 0, lineHeight: "1.4" }}>
          {c.description}
        </p>
      </div>
    </div>
  );
}