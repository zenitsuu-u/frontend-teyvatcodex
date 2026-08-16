import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.tsx";
import AdminHeader from "./AdminHeader.tsx";

export default function AdminLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <AdminSidebar />
            <div style={{ flex: 1, background: "#0d1b2a" }}>

                <AdminHeader />

                <div style={{ padding: "20px", background: "#0d1b2a" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}