import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "/src/pages/Login.jsx";
import { Splash } from "/src/pages/Splash.jsx";
import { Register } from "/src/pages/Register.jsx";
import { ForgotPassword } from "/src/pages/Forgot-password.jsx";
import { Home } from "/src/pages/Home.jsx";

export function RoutesApplication() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}