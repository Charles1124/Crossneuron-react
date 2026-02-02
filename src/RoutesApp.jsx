import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login.jsx";
import { Splash } from "./Splash.jsx";

export function RoutesApplication() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}