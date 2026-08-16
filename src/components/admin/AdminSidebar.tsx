import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
    const location = useLocation();

    const linkStyle = (path: string) => ({
        padding: "12px 18px",
        borderRadius: "8px",
        textDecoration: "none",
        color: location.pathname.startsWith(path) ? "#d4af37" : "white",
        background: location.pathname.startsWith(path)
            ? "rgba(212,175,55,0.15)"
            : "transparent",
        fontWeight: location.pathname.startsWith(path) ? 700 : 500,
        transition: "0.2s",
        display: "block",
    });

    return (
        <div
            style={{
                width: "240px",
                background: "#0a1a2a",
                padding: "20px",
                borderRight: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                minHeight: "100vh",
            }}
        >
            {/* Titre */}
            <h2
                style={{
                    fontFamily: "Cinzel, serif",
                    color: "#d4af37",
                    fontSize: "22px",
                    marginBottom: "10px",
                    textAlign: "center",
                }}
            >
                Teyvat Admin
            </h2>

            {/* Liens */}
            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <Link to="/admin" style={linkStyle("/admin")}>
                    Dashboard
                </Link>

                <Link to="/admin/characters" style={linkStyle("/admin/characters")}>
                    Personnages
                </Link>

                <Link to="/admin/weapons" style={linkStyle("/admin/weapons")}>
                    Armes
                </Link>

                <Link to="/admin/builds" style={linkStyle("/admin/builds")}>
                    Builds
                </Link>
            </nav>
        </div>
    );
}