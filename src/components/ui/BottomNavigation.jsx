import { Home, Gamepad2, BookOpen, User } from "lucide-react"; 
import { useNavigate, useLocation } from "react-router-dom"

const NavItem = ({ icon, label, isActive= false, onClick }) => (
    <button onClick={onClick} className={`nav-item ${isActive ? "active" : "inactive"}`}>
        <div className="nav-icon-wrapper">
            <span>{icon}</span>
        </div>
        <span className="nav-label">{label}</span>
    </button>
);

const BottomNavigation = () => {

    const navigate= useNavigate(); 
    const location= useLocation(); 

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-container">
                <NavItem
                    icon={<Home size={20} />}
                    label="Inicio"
                    isActive={location.pathname.startsWith('/home')} 
                    onClick={() => navigate('/home')}
                />
                <NavItem
                    icon={<Gamepad2 size={20} />}
                    label="Juegos"
                    isActive={location.pathname.startsWith('/games')}
                    onClick={() => navigate('/games')}
                />
                <NavItem
                    icon={<BookOpen size={20} />}
                    label="Ejercicios"
                />
                <NavItem
                    icon={<User size={20} />}
                    label="Perfil"
                />
            </div>
        </nav>
    );
}

export default BottomNavigation; 
