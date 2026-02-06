import { useCallback, useEffect, useState } from "react";
import { Timer } from "../components/game1/Timer"
import { Shape } from "../components/game1/Shapes"
import { useNavigate } from "react-router-dom";
import { Pause, Play, LogOut } from "lucide-react"; 
import "/src/styles/game1-2.css"

const SHAPES = ["circle", "square", "triangle", "star", "hexagon"];
const GAME_DURATION = 30;
const ROUND_DURATION = 5;

export const Game1 = () => {

    const navigate = useNavigate();

    const [gameTime, setGameTime] = useState(GAME_DURATION);
    const [roundTime, setRoundTime] = useState(ROUND_DURATION);
    const [score, setScore] = useState(0);
    const [elegir, setElegir] = useState([]);
    const [target, setTarget] = useState("circle");
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [feedBack, setFeedBack] = useState(null);
    const [isPaused, setPaused] = useState(false);

    const generarNuevaRonda = useCallback(() => {
        const shuffled = [...SHAPES].sort(() => Math.random() - 0.5);
        const elegir = shuffled.slice(0, 3);
        const target = elegir[Math.floor(Math.random() * elegir.length)];

        setElegir(elegir);
        setTarget(target);
        setRoundTime(ROUND_DURATION);
        setFeedBack(null);
    }, []);

    const startGame = () => {
        setGameTime(GAME_DURATION);
        setScore(0);
        setIsPlaying(true);
        setGameOver(false);
        generarNuevaRonda();
    };

    const togglePause = () => {
        setPaused(!isPaused);
    }

    const handleLeave = () => {
        navigate('/games');
    }

    const handleAnswer = (selectedShape) => {
        if (!isPlaying || isPaused) return;

        if (selectedShape === target) {
            setScore((prev) => prev + 10);
            setFeedBack({ type: 'success', message: 'Correcto! +10 puntos' });
            setTimeout(() => {
                generarNuevaRonda();
            }, 500);
        } else {
            setFeedBack({ type: 'error', message: 'Incorrecto!' });
            setTimeout(() => {
                generarNuevaRonda();
                setFeedBack(null);
            }, 1000);
        }
    };

    useEffect(() => {
        if (!isPlaying || isPaused) return;

        const gameInterval = setInterval(() => {
            setGameTime((prev) => {
                if (prev <= 0.1) {
                    setIsPlaying(false);
                    setGameOver(true);
                    return 0;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(gameInterval);
    }, [isPlaying, isPaused]);

    useEffect(() => {
        if (!isPlaying || isPaused) return;

        const roundInterval = setInterval(() => {
            setRoundTime((prev) => {
                if (prev <= 0.1) {
                    generarNuevaRonda();
                    return ROUND_DURATION;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(roundInterval);
    }, [isPlaying, isPaused, generarNuevaRonda]);

    return (
        <div className="game1-container">
            <div className="game1-wrapper">
                <div className="game-actions">
                    {isPlaying && !gameOver && (
                        <button onClick={togglePause} className="action-button pause-button">{isPaused ? <Play size={20} /> : <Pause size={20} />}</button>
                    )}
                    <button onClick={handleLeave} className="action-button leave-button">
                        <LogOut size={20} />
                    </button>
                </div>

                <div className="game1-header">
                    <h1>Juego de Figuras</h1>
                    <p>Encuentre la figura correcta antes de que se acabe el tiempo</p>
                </div>

                <div className="stats-bar">
                    <Timer
                        label="Tiempo del juego"
                        time={gameTime}
                        maxTime={GAME_DURATION}
                        variant="game"
                    />
                    <Timer
                        label="Tiempo de ronda"
                        time={roundTime}
                        maxTime={ROUND_DURATION}
                        variant="round"
                    />
                </div>

                {feedBack && (
                    <div className={`feedback-toast ${feedBack.type}`}>
                        {feedBack.message}
                    </div>
                )}

                {isPaused && isPlaying && !gameOver && (
                    <div className="pause-overlay">
                        <div className="pause-card">
                            <h2>Juego Pausado</h2>
                            <button onClick={togglePause} className="resume-button">
                                Continuar
                            </button>
                        </div>
                    </div>
                )}

                {!isPlaying && !gameOver && (
                    <div className="start-screen">
                        <div className="start-content">
                            <button onClick={startGame} className="start-button">Comenzar</button>
                        </div>
                    </div>
                )}

                {gameOver && (
                    <div className="gameover-screen">
                        <div className="gameover-card">
                            <h2 className="gameover-title">Juego Terminado!</h2>
                            <p className="gameover-score">{score}</p>
                            <p className="gameover-label">Puntos</p>
                            <button onClick={startGame} className="restart-button">Jugar de Nuevo</button>
                        </div>
                    </div>
                )}

                {isPlaying && !isPaused && (
                    <div className="playing-area">
                        <div className="choice-button">
                            <div className="section-header-game">
                                <h2 className="section-title-game">Elige la forma correcta</h2>
                            </div>
                            <div className="shapes-grid">
                                {elegir.map((shape, index) => (
                                    <div key={index} className="shape-choice" style={{ animationDelay: `${index * 0.2}s` }}
                                        onClick={() => handleAnswer(shape)}>
                                        <Shape type={shape} onClick={() => handleAnswer(shape)} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="target-section">
                            <div className="section-header-game">
                                <h2 className="section-title-game">Encuentra esta forma</h2>
                            </div>
                            <div className="target-wrapper">
                                <div className="shape-target">
                                    <Shape type={target} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}