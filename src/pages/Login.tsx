import { useState, useContext } from "react";
import { AuthContext } from "../Authcontext";
import { useNavigate } from "react-router-dom";
import "../App.css";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Identifiants incorrects");
                return;
            }

            login(data.token); // stocke le token
            navigate("/account"); // redirection
        } catch (err) {
            setError("Erreur serveur");
        }
    };

    return (
        <div className="account-page">
            <div className="account-inner">

                <div className="login-card">
                    <h1 className="login-title">Connexion</h1>

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

                        {error && <p className="error">{error}</p>}

                        <button type="submit" className="login-btn">
                            Se connecter
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}