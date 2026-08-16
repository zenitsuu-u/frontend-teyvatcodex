import { Link } from "react-router-dom";

export default function AdminSidebar() {
    return (
        <div
            style={{
                width: "250px",
                background: "#1e1e1e",
                color: "white",
                padding: "20px",
            }}
        >
            <h2>Teyvat Admin</h2>

            <nav style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Link to="/admin" style={{ color: "white" }}>Dashboard</Link>
                <Link to="/admin/characters" style={{ color: "white" }}>Personnages</Link>
                <Link to="/admin/weapons" style={{ color: "white" }}>Armes</Link>
                <Link to="/admin/builds" style={{ color: "white" }}>Builds</Link>
                <Link to="/admin/stats" style={{ color: "white" }}>Panel Admin</Link>
            </nav>
        </div>
    );
}