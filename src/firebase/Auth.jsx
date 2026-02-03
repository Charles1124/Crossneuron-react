import { getAuth } from "firebase/auth"; 
import { app } from "./config.js";

export function useAuth() {
    const auth = getAuth(app);
    return { auth };
}
