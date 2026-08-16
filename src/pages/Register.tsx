import { useState, useContext } from "react";
import { AuthContext } from "../Authcontext";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

        if (password !== confirm) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Erreur lors de l'inscription");
                return;
            }

            // Auto-login après inscription
            login(data.token);
            navigate("/account");

        } catch (err) {
            setError("Erreur serveur");
        }
    };

    return (
        <div className="account-page">
            <div className="account-inner">

                <div className="login-card">
                    <h1 className="login-title">Créer un compte</h1>

                    <form onSubmit={handleSubmit} className="login-form">

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Adresse email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirmer le mot de passe</label>
                            <input
                                type="password"
                                placeholder="Confirmez le mot de passe"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="error">{error}</p>}

                        <button type="submit" className="login-btn">
                            S'inscrire
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}