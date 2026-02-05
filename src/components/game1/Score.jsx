import '/src/styles/game1.css';
import { Trophy } from "lucide-react"

export const Score = ({ score }) => {
    return (
        <div className="score-container">
            <div className="score-header">
                <Trophy className="score-icon" size={15} />
                <div className="score-label">
                    Puntuación
                </div>
            </div>
            <div className="score">
                {score}
            </div>
        </div>
    )
}


