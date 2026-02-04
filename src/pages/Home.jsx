import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import '/src/styles/home.css'
import HeroCarrousel from "../components/HeroCarrousel";
import CategoryCard from "../components/CategoryCard"; 
import BottomNavigation from "../components/BottomNavigation"; 
import { Brain, Target, Heart, Zap } from "lucide-react" 

export function Home() {

    const [userName, setUsername] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUsername(user.displayName || user.email);
        }
    }, []);

    return (
        <>
            <div className="home-page">
                <header className='home-header'>
                    <div>
                        <p>¡Bienvenido! {userName.displayName}</p>
                        <h1>Crossneuron</h1>
                    </div>
                </header>

                <main className="home-contenedor">
                    <HeroCarrousel />

                    <div className="daily-goal">
                        <div className="daily-goal-header">
                            <h3>Meta del día</h3>
                            <span>2/3 Completados</span>
                        </div>
                        <div className="daily-goal-bar">
                            <div className="daily-goal-bar-fill" style={{ width: "66%" }} />
                        </div>
                        <p>¡Solo te falta 1 ejercicio para hoy!</p>
                    </div>

                    <section>
                        <div className="section-header">
                            <h2>Categorías</h2>
                            <button>Ver todo</button>
                        </div>
                        <div className="categorias-grid">
                            <CategoryCard
                                icon={Brain}
                                title="Concentración"
                                description="Mejora tu enfoque mental"
                                color="primary"
                                delay={0}
                            />
                            <CategoryCard
                                icon={Target}
                                title="Visualización"
                                description="Técnicas visuales"
                                color="accent"
                                delay={100}
                            />
                            <CategoryCard
                                icon={Heart}
                                title="Control emocional"
                                description="Mejora la presión"
                                color="calm"
                                delay={200}
                            />
                            <CategoryCard
                                icon={Zap}
                                title="Motivación"
                                description="Impulsa tu rendimiento"
                                color="primary"
                                delay={300}
                            />
                        </div>
                    </section>
                </main> 
                <BottomNavigation/>
            </div>
        </>
    )
}