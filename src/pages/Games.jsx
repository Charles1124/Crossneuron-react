import { Shapes, Palette, Workflow} from "lucide-react"
import CategoryCard from "../components/ui/CategoryCard"
import BottomNavigation from "../components/ui/BottomNavigation" 
import "/src/styles/games.css" 
import { useNavigate } from "react-router-dom"

export function Games (){

    const navigate= useNavigate(); 

    return(
        <div className="games-page">
            <header className="games-header"> 
                <h1>Mini Juegos</h1>
                <p>Entrene y agilice su mente!</p>
            </header>

            <main className="games-contenedor">
                <section>
                    <div className="section-header">
                        <h2>Juegos Disponibles</h2> 
                    </div>
                    <div className="games-grid">
                        <CategoryCard
                        icon= {Shapes}
                        title= "Figuras Geométricas"
                        description= "Elija la figura correcta del patrón"
                        color= "primary"
                        delay={0} 
                        onClick= {() => navigate("/game1")}
                        /> 
                        <CategoryCard
                        icon= {Palette}
                        title= "Colores"
                        description= "Ejercicios con colores"
                        color= "accent"
                        delay={100} 
                        onClick={() => navigate("/game2")}
                        /> 
                        <CategoryCard
                        icon= {Shapes}
                        title= "Patrón"
                        description= "Siga el patrón y elija la pelota correcta"
                        color= "calm"
                        delay={200}
                        /> 
                    </div>
                </section>
            </main> 
            <BottomNavigation/>
        </div>
    )
}