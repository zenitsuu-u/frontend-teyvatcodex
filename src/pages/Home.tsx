import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider.tsx";


type Filter = "permanent" | "temporaire";

function SectionHeader({
                           title,
                           filter,
                           setFilter,
                       }: {
    title: string;
    filter: Filter;
    setFilter: (f: Filter) => void;
}) {
    return (
        <div style={sectionHeader}>
            <h2 style={sectionTitle}>{title}</h2>

            <div style={{ display: "flex", gap: "6px" }}>
                {(["permanent", "temporaire"] as Filter[]).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            ...pillStyle,
                            background: filter === f ? "#facc15" : "transparent",
                            color: filter === f ? "#0f172a" : "rgba(255,255,255,0.6)",
                            borderColor:
                                filter === f ? "#facc15" : "rgba(255,255,255,0.15)",
                        }}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    const [bannerFilter, setBannerFilter] = useState<Filter>("temporaire");
    const [eventFilter, setEventFilter] = useState<Filter>("temporaire");

    /* ------------------ DATA ------------------ */

    const banners = [
        {
            id: 1,
            title: "Nefer",
            subtitle: "Bannière personnage",
            type: "temporaire",
            image:
                "https://lagazettedeteyvat.fr/wp-content/uploads/2026/04/Banniere-Luna-VI-Nefer-Genshin-Impact.webp",
            accent: "#a5f3fc",
        },
        {
            id: 2,
            title: "Lauma",
            subtitle: "Bannière personnage",
            type: "temporaire",
            image:
                "https://lagazettedeteyvat.fr/wp-content/uploads/2026/04/Banniere-Luna-VI-Lauma-Genshin-Impact.webp",
            accent: "#fca5a5",
        },
        {
            id: 3,
            title: "Engulfing Lightning",
            subtitle: "Bannière arme",
            type: "temporaire",
            image:
                "https://lagazettedeteyvat.fr/wp-content/uploads/2026/04/Banniere-Luna-VI-Armes-P2-Genshin-Impact.webp",
            accent: "#c4b5fd",
        },
        {
            id: 4,
            title: "Bannière de Fontaine",
            subtitle: "Bannière personnage",
            type: "temporaire",
            image:
                "https://lagazettedeteyvat.fr/wp-content/uploads/2026/04/Banniere-Nostalgie-Luna-VI-Genshin-Impact.webp",
            accent: "#fca5a5",
        },
        {
            id: 5,
            title: "Bannière permanente",
            subtitle: "Bannière standard",
            type: "permanent",
            image:
                "https://static.wikia.nocookie.net/genshinimpact/images/1/1c/Bannière_Envie_de_voyage_2.jpg/revision/latest/scale-to-width-down/600?cb=20220227204824&path-prefix=fr",
            accent: "#facc15",
        },
    ];

    const events = [
        {
            id: 1,
            title: "Combat EndGame",
            subtitle: "Événement Récurrent",
            type: "temporaire",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeN-KRkQss1gZ5SSgbQecOMYaJCqLkZ3wkJw&s",
            accent: "#6ee7b7",
        },
        {
            id: 2,
            title: "Festival de Mondstadt",
            subtitle: "Événement saisonnier",
            type: "temporaire",
            image: "https://media.discordapp.net/attachments/1239972663037006043/1502289240619225240/image.png?ex=6a0dabe2&is=6a0c5a62&hm=6f46afe79c8043bfc9067a655b231685f6a9bd0b446021d22df714e289f5d0a7&=&format=webp&quality=lossless",
            accent: "#fbcfe8",
        },
    ];

    const exploreCards = [
        {
            label: "Personnages",
            to: "/characters",
            icon: "⚔️",
            desc: "Tous les personnages jouables",
        },
        {
            label: "Armes",
            to: "/weapons",
            icon: "🗡️",
            desc: "Catalogue des armes",
        },
        {
            label: "Builds",
            to: "/builds",
            icon: "📖",
            desc: "Guides et optimisations",
        },
    ];

    /* ------------------ RENDER ------------------ */

    return (
        <div style={containerStyle}>
            {/* HERO */}
            <div style={{ marginBottom: "40px", textAlign: "center" }}>
                <p style={heroSubtitle}>TEYVAT GUIDE</p>
                <h1 style={heroTitle}>Bienvenue, Voyageur</h1>
                <p style={heroText}>
                    Retrouve les bannières, événements et guides de builds en un seul
                    endroit.
                </p>
            </div>

            {/* BANNIÈRES */}
            <SectionHeader
                title="Bannières actuelles"
                filter={bannerFilter}
                setFilter={setBannerFilter}
            />

            <Slider
                items={banners.filter((b) => b.type === bannerFilter)}
                height={160}
            />

            <SectionHeader
                title="Événements"
                filter={eventFilter}
                setFilter={setEventFilter}
            />

            <Slider
                items={events.filter((e) => e.type === eventFilter)}
                height={160}
            />

            <h2 style={sectionTitle}>Explorer</h2>

            <div style={carouselStyle}>
                {exploreCards.map((c) => (
                    <Link
                        key={c.label}
                        to={c.to}
                        style={{
                            ...featureCard,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                        }}
                    >
                        <span style={{ fontSize: "22px" }}>{c.icon}</span>
                        <strong>{c.label}</strong>
                        <p style={{ fontSize: "12px", opacity: 0.7 }}>{c.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const containerStyle: React.CSSProperties = {
    padding: "20px",
    color: "white",
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    boxSizing: "border-box",
};

const sectionHeader: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "12px",
    flexWrap: "wrap",
};

const sectionTitle: React.CSSProperties = {
    margin: "20px 0 12px",
    fontSize: "20px",
    fontWeight: 700,
};

const heroSubtitle: React.CSSProperties = {
    margin: "0 0 6px",
    color: "#facc15",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
};

const heroTitle: React.CSSProperties = {
    margin: "0 0 10px",
    fontSize: "clamp(30px, 8vw, 52px)",
    lineHeight: 1.1,
};

const heroText: React.CSSProperties = {
    margin: 0,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.6,
    maxWidth: "600px",
    marginInline: "auto",
};

const pillStyle: React.CSSProperties = {
    padding: "5px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    border: "1px solid",
    cursor: "pointer",
    transition: "all 0.2s",
    background: "transparent",
};

const carouselStyle: React.CSSProperties = {
    display: "flex",
    gap: "14px",
    overflowX: "auto",
    overflowY: "hidden",
    paddingBottom: "10px",
    marginBottom: "30px",
    scrollSnapType: "x mandatory",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
};

const featureCard: React.CSSProperties = {
    width: "80vw",
    maxWidth: "280px",
    minWidth: "220px",
    padding: "22px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #1e293b, #172033)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    flexShrink: 0,
    scrollSnapAlign: "start",
    textAlign: "center",
};
