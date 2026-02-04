import { Home, Gamepad2, BookOpen, User } from "lucide-react";

const NavItem = ({ icon, label, isActive= false, onClick }) => (
    <button onClick={onClick} className={`nav-item ${isActive ? "active" : "inactive"}`}>
        <div className="nav-icon-wrapper">
            <span>{icon}</span>
        </div>
        <span className="nav-label">{label}</span>
    </button>
);

const BottomNavigation = () => {
    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-container">
                <NavItem
                    icon={<Home size={20} />}
                    label="Inicio"
                    isActive={true}
                />
                <NavItem
                    icon={<Gamepad2 size={20} />}
                    label="Juegos"
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
