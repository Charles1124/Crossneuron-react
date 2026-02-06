import { Play, RotateCcw, Check, Eye, Circle, Triangle, Square } from "lucide-react";
import '/src/styles/game3.css';

const patternOptions = [
  { type: "circle", icon: Circle, label: "Círculo" },
  { type: "triangle", icon: Triangle, label: "Triángulo" },
  { type: "square", icon: Square, label: "Cuadrado" },
];

const GameControls = ({
  gamePhase,
  onStart,
  onCheck,
  onReset,
  selectedPattern,
  onPatternSelect,
  isCorrect,
}) => {
  return (
    <div className="game-controls">
      {gamePhase === "idle" && (
        <button className="game-button game-button-start" onClick={onStart}>
          <Play className="button-icon" size={20} />
          Iniciar Juego
        </button>
      )}

      {gamePhase === "observing" && (
        <div className="observing-message">
          <Eye className="observing-icon" size={20} />
          <span className="observing-text">Observa las pelotas...</span>
        </div>
      )}

      {gamePhase === "selecting" && (
        <div className="selecting-phase">
          <p className="selecting-question">
            ¿Qué figura siguió la pelota?
          </p>
          <div className="pattern-options">
            {patternOptions.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => onPatternSelect(type)}
                className={`pattern-option ${selectedPattern === type ? "pattern-option-selected" : ""}`}
              >
                <Icon className="pattern-icon" size={32} />
                <span className="pattern-label">{label}</span>
              </button>
            ))}
          </div>
          <button
            className="game-button game-button-check"
            onClick={onCheck}
            disabled={!selectedPattern}
          >
            <Check className="button-icon" size={20} />
            Verificar
          </button>
        </div>
      )}

      {gamePhase === "result" && (
        <div className="result-phase">
          <div className={`result-message ${isCorrect ? "result-correct" : "result-incorrect"}`}>
            {isCorrect ? "¡Correcto! 🎉" : "Incorrecto 😔"}
          </div>
          <button className="game-button game-button-reset" onClick={onReset}>
            <RotateCcw className="button-icon" size={20} />
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
};

export default GameControls;