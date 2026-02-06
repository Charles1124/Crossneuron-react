import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "/src/pages/Login.jsx";
import { Splash } from "/src/pages/Splash.jsx";
import { Register } from "/src/pages/Register.jsx";
import { ForgotPassword } from "/src/pages/Forgot-password.jsx";
import { Home } from "/src/pages/Home.jsx"; 
import { Games } from "../pages/Games";
import { Game1 } from "../pages/Game1" 
import { Game2 } from "../pages/Game2" 
import { Game3 } from "../pages/Game3"

export function RoutesApplication() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<Home />} /> 
                <Route path="/games" element={<Games />}></Route>
                <Route path="/game1" element={<Game1/>}></Route>
                <Route path="/game2" element={<Game2/>}></Route> 
                <Route path="/game3" element={<Game3 />}></Route>
            </Routes>
        </BrowserRouter>
    );
}