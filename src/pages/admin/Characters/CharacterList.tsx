import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Character = {
    name: string;
    slug: string;
    element: string;
    weapon: string;
    rarity: number;
    region: string;
    description: string;
    icon: string;
    image: string;
};

export default function CharacterList() {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/admin/characters", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data: Character[]) => setCharacters(data));
    }, []);

    function handleDelete(slug: string) {
        if (!confirm("Supprimer ce personnage ?")) return;

        fetch(`http://${import.meta.env.VITE_API_URL}/admin/characters/${slug}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
            .then((res) => res.json())
            .then(() => {
                setCharacters(characters.filter((c) => c.slug !== slug));
            });
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Personnages</h1>

            <Link to="/admin/characters/create" className="admin-btn">
                + Créer un personnage
            </Link>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Slug</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {characters.map((c) => (
                    <tr key={c.slug}>
                        <td>{c.name}</td>
                        <td>{c.slug}</td>
                        <td style={{ display: "flex", gap: "10px" }}>
                            <Link
                                className="admin-btn"
                                to={`/admin/characters/edit/${c.slug}`}
                            >
                                Modifier
                            </Link>

                            <button
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleDelete(c.slug)}
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