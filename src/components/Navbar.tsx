import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
    { label: "Accueil", to: "/" },
    { label: "Personnages", to: "/characters" },
    { label: "Armes", to: "/weapons" },
    { label: "Builds", to: "/builds" },
    { label: "Compte", to: "/account" },
];

export default function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isActive = (to: string) => location.pathname === to;

    return (
        <nav style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 1.5rem",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>

                {/* Brand */}
                <Link to="/" style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    background: "linear-gradient(90deg, #e2c97e, #f0e2b0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.05em",
                    fontFamily: "Georgia, serif",
                }}>
                    ✦ TeyvatCodex
                </Link>


                {/* Desktop links */}
                {!isMobile && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        {links.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                style={{
                                    padding: "0.4rem 1rem",
                                    borderRadius: "6px",
                                    textDecoration: "none",
                                    fontSize: "0.875rem",
                                    fontWeight: isActive(item.to) ? 600 : 400,
                                    color: isActive(item.to) ? "#e2c97e" : "#94a3b8",
                                    background: isActive(item.to) ? "rgba(226, 201, 126, 0.1)" : "transparent",
                                    borderBottom: isActive(item.to) ? "2px solid #e2c97e" : "2px solid transparent",
                                    transition: "all 0.2s ease",
                                    letterSpacing: "0.02em",
                                }}
                                onMouseEnter={e => {
                                    if (!isActive(item.to)) {
                                        (e.target as HTMLElement).style.color = "#cbd5e1";
                                        (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive(item.to)) {
                                        (e.target as HTMLElement).style.color = "#94a3b8";
                                        (e.target as HTMLElement).style.background = "transparent";
                                    }
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Mobile burger */}
                {isMobile && (
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                        style={{
                            background: "none",
                            border: "1px solid rgba(148,163,184,0.3)",
                            borderRadius: "6px",
                            padding: "6px 8px",
                            cursor: "pointer",
                            color: "#94a3b8",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                        }}
                    >
            <span style={{
                display: "block", width: "20px", height: "2px",
                background: "#94a3b8",
                transform: isMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                transition: "transform 0.2s",
            }} />
                        <span style={{
                            display: "block", width: "20px", height: "2px",
                            background: "#94a3b8",
                            opacity: isMenuOpen ? 0 : 1,
                            transition: "opacity 0.2s",
                        }} />
                        <span style={{
                            display: "block", width: "20px", height: "2px",
                            background: "#94a3b8",
                            transform: isMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                            transition: "transform 0.2s",
                        }} />
                    </button>
                )}
            </div>

            {/* Mobile menu dropdown */}
            {isMobile && isMenuOpen && (
                <div style={{
                    background: "#0f172a",
                    borderTop: "1px solid rgba(148,163,184,0.1)",
                    padding: "0.5rem 1.5rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                }}>
                    {links.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                padding: "0.65rem 0.75rem",
                                borderRadius: "6px",
                                textDecoration: "none",
                                fontSize: "0.95rem",
                                fontWeight: isActive(item.to) ? 600 : 400,
                                color: isActive(item.to) ? "#e2c97e" : "#94a3b8",
                                background: isActive(item.to) ? "rgba(226,201,126,0.08)" : "transparent",
                                borderLeft: isActive(item.to) ? "3px solid #e2c97e" : "3px solid transparent",
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}