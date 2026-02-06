import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Pause, Play, LogOut } from "lucide-react";
import GameArena from "../components/game3/GameArena";
import GameControls from "../components/game3/GameControls";
import Pattern from "../components/game3/Pattern";
import '/src/styles/game3.css';

export const Game3 = () => {
  const navigate = useNavigate();
  const [gamePhase, setGamePhase] = useState("idle");
  const [patternBalls, setPatternBalls] = useState([]);
  const [patternType, setPatternType] = useState("circle");
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isPaused, setIsPaused] = useState(false);
  
  const [duration, setDuration] = useState(5); 
  const [speed, setSpeed] = useState(2);
  
  const timeoutRef = useRef();

  const startGame = useCallback(() => {

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    //Una pelota por patrón por el momento.
    const allBallIds = [0, 1, 2];
    const shuffled = allBallIds.sort(() => Math.random() - 0.5);
    const selectedPatternBalls = shuffled.slice(0, 1);

    // Seleccionar patrón random
    const patterns = ["circle", "triangle", "square"];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

    setPatternBalls(selectedPatternBalls);
    setPatternType(randomPattern);
    setSelectedPattern(null);
    setIsCorrect(undefined);
    setGamePhase("observing");
    setIsPaused(false);

    
    timeoutRef.current = setTimeout(() => {
      setGamePhase("selecting");
    }, duration * 1000);
  }, [duration]);

  const handlePatternSelect = useCallback(
    (pattern) => {
      if (gamePhase !== "selecting") return;
      setSelectedPattern(pattern);
    },
    [gamePhase]
  );

  const checkAnswer = useCallback(() => {
    const correct = selectedPattern === patternType;

    setIsCorrect(correct);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
    setGamePhase("result");
  }, [selectedPattern, patternType]);

  const resetGame = useCallback(() => {
    setGamePhase("idle");
    setPatternBalls([]);
    setSelectedPattern(null);
    setIsCorrect(undefined);
  }, []);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleLeave = () => {
    navigate('/games');
  };

  const getPhaseTitle = () => {
    switch(gamePhase) {
      case "idle": return "¿Listo para el desafío?";
      case "observing": return "Observa con atención...";
      case "selecting": return "¿Qué figura dibujó la pelota?";
      case "result": return isCorrect ? "¡Excelente!" : "Inténtalo de nuevo";
      default: return "";
    }
  };

  const getPhaseDescription = () => {
    switch(gamePhase) {
      case "idle": 
        return "Una pelota se moverá siguiendo un patrón geométrico. Tu tarea es identificar qué figura dibujó.";
      case "observing":
        return "Observa el movimiento de las pelotas. Una de ellas sigue un patrón.";
      case "selecting":
        return "Selecciona la figura que crees que siguió la pelota.";
      case "result":
        if (isCorrect) {
          return "¡Has identificado correctamente el patrón!";
        } else {
          const patternNames = {
            circle: "Círculo",
            triangle: "Triángulo",
            square: "Cuadrado"
          };
          return `El patrón correcto era: ${patternNames[patternType]}`;
        }
      default: return "";
    }
  };

  return (
    <div className="game3-container">
      {/* Action Buttons */}
      <div className="game-actions">
        {gamePhase === "observing" && (
          <button onClick={togglePause} className="action-button pause-button">
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
        )}
        <button onClick={handleLeave} className="action-button leave-button">
          <LogOut size={20} />
        </button>
      </div>

      {/* Pausa */}
      {isPaused && gamePhase === "observing" && (
        <div className="pause-overlay">
          <div className="pause-card">
            <h2>Juego Pausado</h2>
            <button onClick={togglePause} className="resume-button">
              Continuar
            </button>
          </div>
        </div>
      )}

      <header className="game3-header">
        <div className="game3-header-content">
          <div className="game3-title-section">
            <div>
              <h1 className="game3-title">Identifica el Patrón</h1>
            </div>
          </div>

          <div className="game3-score">
            <span className="score-label">
              Puntuación:{" "}
              <span className="score-value">
                {score.correct}/{score.total}
              </span>
            </span>
          </div>
        </div>
      </header>

      <main className="game3-main">
        <div className="game3-instructions">
          <h2 className="instructions-title">{getPhaseTitle()}</h2>
          <p className="instructions-description">{getPhaseDescription()}</p>
        </div>

        <div className="pattern-indicator-wrapper">
          <Pattern
            patternType={patternType}
            show={gamePhase === "result"}
          />
        </div>

        <div className="game3-content">
          <div className="arena-wrapper">
            <GameArena
              isPlaying={gamePhase === "observing" && !isPaused}
              patternBalls={patternBalls}
              patternType={patternType}
              speed={speed}
            />
          </div>
          
        </div>

        {/* Controls */}
        <div className="controls-wrapper">
          <GameControls
            gamePhase={gamePhase}
            onStart={startGame}
            onCheck={checkAnswer}
            onReset={resetGame}
            selectedPattern={selectedPattern}
            onPatternSelect={handlePatternSelect}
            isCorrect={isCorrect}
          />
        </div>
      </main>
    </div>
  );
};