import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import Navbar from "./components/Navbar";
import Weapons from "./pages/Weapons";
import WeaponDetails from "./pages/WeaponDetails";
import PublicBuildList from "./pages/PublicBuildList.tsx";
import BuildDetails from "./pages/BuildsDetails.tsx";
import Account from "./pages/Account.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";


import AdminLayout from "./pages/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";

import CharacterList from "./pages/admin/Characters/CharacterList.tsx";
import CharacterCreate from "./pages/admin/Characters/CharacterCreate.tsx";
import CharacterEdit from "./pages/admin/Characters/CharacterEdit.tsx";

import WeaponList from "./pages/admin/Weapons/WeaponList.tsx";
import WeaponCreate from "./pages/admin/Weapons/WeaponCreate.tsx";
import WeaponEdit from "./pages/admin/Weapons/WeaponEdit.tsx";

import BuildCreate from "./pages/admin/Builds/BuildCreate.tsx";
import BuildEdit from "./pages/admin/Builds/BuildEdit.tsx";
import BuildList from "./pages/admin/Builds/BuildList.tsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/characters" element={<Characters />} />
                <Route path="/characters/:slug/details" element={<CharacterDetails />} />

                <Route path="/weapons" element={<Weapons />} />
                <Route path="/weapons/:slug" element={<WeaponDetails />} />

                <Route path="/builds" element={<PublicBuildList />} />
                <Route path="/build/:slug" element={<BuildDetails />} />

                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />

                    <Route path="characters" element={<CharacterList />} />
                    <Route path="characters/create" element={<CharacterCreate />} />
                    <Route path="characters/edit/:slug" element={<CharacterEdit />} />

                    <Route path="weapons" element={<WeaponList />} />
                    <Route path="weapons/create" element={<WeaponCreate />} />
                    <Route path="weapons/edit/:slug" element={<WeaponEdit />} />

                    <Route path="builds" element={<BuildList />} />
                    <Route path="builds/create" element={<BuildCreate />} />
                    <Route path="builds/edit/:id" element={<BuildEdit />} />
                    <Route path="builds" element={<BuildList />} />

                    <Route path="/admin/stats" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;