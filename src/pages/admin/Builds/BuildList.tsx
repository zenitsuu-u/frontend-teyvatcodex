import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Build } from "../../../types";

export default function BuildList() {
    const [builds, setBuilds] = useState<Build[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/admin/builds", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
            .then(res => res.json())
            .then(data => setBuilds(data));
    }, []);

    function handleDelete(id: number) {
        if (!confirm("Supprimer ce build ?")) return;

        fetch(`${import.meta.env.VITE_API_URL}/admin/builds/${id}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
            .then(res => res.json())
            .then(() => {
                setBuilds(builds.filter((b) => b.id !== id));
            });
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Builds</h1>

            <Link to="/admin/builds/create" className="admin-btn">
                + Créer un build
            </Link>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>Personnage</th>
                    <th>Arme</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {builds.map((b) => (
                    <tr key={b.id}>
                        <td>{b.character_slug}</td>
                        <td>{b.weapon_slug}</td>
                        <td style={{ display: "flex", gap: "10px" }}>
                            <Link
                                className="admin-btn"
                                to={`/admin/builds/edit/${b.id}`}
                            >
                                Modifier
                            </Link>

                            <button
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleDelete(b.id)}
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}