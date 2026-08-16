import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authcontext";
import "../App.css";

type Favorite = {
    id: number;
    type: string;
    target_id: string;
};

export default function Account() {
    const { token, role, logout } = useContext(AuthContext);
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        async function loadFavorites() {
            if (!token) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setFavorites(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadFavorites();
    }, [token]);

    const getFavoriteLink = (fav: Favorite) => {
        switch (fav.type) {
            case "character":
                return `/characters/${fav.target_id}/details`;
            case "build":
                return `/build/${fav.target_id}`;
            case "weapon":
                return `/weapons/${fav.target_id}`;
            default:
                return "/";
        }
    };

    const getFavoriteLabel = (fav: Favorite) => {
        switch (fav.type) {
            case "character":
                return "Personnage";
            case "build":
                return "Build";
            case "weapon":
                return "Arme";
            default:
                return fav.type;
        }
    };

    return (
        <div className="account-page">
            <div className="account-inner">

                {/* HEADER */}
                <header className="account-header">
                    <div className="account-emblem">
                        <svg viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="46" stroke="#d4af37" strokeWidth="0.8" />
                            <circle
                                cx="50"
                                cy="50"
                                r="36"
                                stroke="#d4af37"
                                strokeWidth="0.5"
                                strokeDasharray="4 6"
                            />
                            <polygon
                                points="50,12 56,38 82,38 61,54 69,80 50,64 31,80 39,54 18,38 44,38"
                                stroke="#d4af37"
                                strokeWidth="0.9"
                                fill="rgba(212,175,55,0.06)"
                            />
                        </svg>
                    </div>

                    <h1 className="account-title">Mon Compte</h1>

                    <div className="account-divider">
                        <div className="divider-line" />
                        <div className="divider-gem" />
                        <div className="divider-line" />
                    </div>
                </header>

                {/* SI NON CONNECTÉ */}
                {!token && (
                    <div className="guest-section">
                        <div className="guest-ornament">
                            <div className="guest-ornament-ring" />
                            <div className="guest-ornament-ring" />
                            <span className="guest-icon">⚔️</span>
                        </div>

                        <p className="guest-subtitle">
                            Vous n'êtes pas encore entré dans le sanctuaire.
                        </p>

                        <div className="btn-row">
                            <Link to="/login" className="btn-primary">
                                ✦ Se connecter
                            </Link>

                            <Link to="/register" className="btn-secondary">
                                Créer un compte
                            </Link>
                        </div>
                    </div>
                )}

                {/* SI CONNECTÉ */}
                {token && (
                    <div>

                        {/* INFOS COMPTE */}
                        <div className="account-card">
                            <div className="card-corner-tl" />

                            <h2 className="card-title">
                                <span className="card-title-icon">⚜</span>
                                Informations du compte
                            </h2>

                            <div className="status-badge">
                                <div className="status-dot" />
                                Connecté
                            </div>

                            <p className="card-body">
                                Bienvenue, aventurier. Votre session est active et sécurisée.
                            </p>

                            <p className="card-body" style={{ opacity: 0.8 }}>
                                Rôle : <strong style={{ color: "#d4af37" }}>{role}</strong>
                            </p>
                        </div>

                        {/* SECTION ADMIN */}
                        {role === "admin" && (
                            <div className="account-card">
                                <div className="card-corner-tl" />

                                <h2 className="card-title">
                                    <span className="card-title-icon">⚔</span>
                                    Administration
                                </h2>

                                <div className="admin-buttons">
                                    <Link to="/admin/characters/create" className="admin-btn">Créer un personnage</Link>
                                    <Link to="/admin/weapons/create" className="admin-btn">Créer une arme</Link>
                                    <Link to="/admin/builds/create" className="admin-btn">Créer un build</Link>
                                    <Link to="/admin/characters" className="admin-btn">Gérer les personnages</Link>
                                    <Link to="/admin/weapons" className="admin-btn">Gérer les armes</Link>
                                    <Link to="/admin/builds" className="admin-btn">Gérer les builds</Link>
                                    <Link to="/admin/stats" className="admin-btn">Panel Admin</Link>
                                </div>
                            </div>
                        )}

                        <div className="account-card">
                            <div className="card-corner-tl" />

                            <h2 className="card-title">
                                <span className="card-title-icon">★</span>
                                Mes Favoris
                            </h2>

                            {favorites.length === 0 && (
                                <p className="card-body">Aucun favori pour le moment.</p>
                            )}

                            {favorites.length > 0 && (
                                <ul className="favorites-list" style={{ listStyle: "none", padding: 0 }}>
                                    {favorites.map((fav) => (
                                        <li key={fav.id} style={{ marginBottom: "10px" }}>
                                            <Link
                                                to={getFavoriteLink(fav)}
                                                className="admin-btn"
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    textDecoration: "none",
                                                    width: "100%",
                                                    boxSizing: "border-box",
                                                }}
                                            >
                                            <span style={{ fontFamily: "Cinzel, serif", fontSize: "13px" }}>
                                                {getFavoriteLabel(fav)}
                                            </span>
                                                <span style={{ opacity: 0.7, fontSize: "13px" }}>
                                                {fav.target_id} →
                                            </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="logout-row">
                            <button onClick={logout} className="btn-secondary">
                                ↩ Se déconnecter
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}