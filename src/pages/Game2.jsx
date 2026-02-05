import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles/game1.css";
import { Pause, Play, LogOut } from "lucide-react";

export const Game2 = () => {

    const TIEMPO_JUEGO = 20;
    const TIEMPO_RONDA = 5;
    const TIEMPO_INTERVALO = 3;

    const navigate = useNavigate();

    const [isPaused, setPaused] = useState(false);
    const [currentColor, setCurrentColor] = useState("black");
    const [isInterval, setIsInterval] = useState(false)
    const [gameTime, setGameTime] = useState(TIEMPO_JUEGO);
    const [roundTime, setRoundTime] = useState(TIEMPO_RONDA);
    const [intervalTime, setIntervalTime] = useState(TIEMPO_INTERVALO);
    const [isPlaying, setisPlaying] = useState(false);
    const [countdown, setCountdown]= useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [showCountdown, setShowCountdown] = useState(true);

    const colores = [
        "red",
        "blue",
        "yellow",
        "purple",
    ]

    const getRandomColor = () => {
        return colores[Math.floor(Math.random() * colores.length)];
    }

    const generarNuevaRonda = useCallback(() => {
        setIsInterval(false);
        setCurrentColor(getRandomColor);
        setRoundTime(TIEMPO_RONDA);
        setIntervalTime(TIEMPO_INTERVALO);
    }, []);

    const startGame = () => {
        setIsInterval(false);
        setGameTime(TIEMPO_JUEGO);
        setisPlaying(true)
        setGameOver(false)
        setCurrentColor(getRandomColor);
        setRoundTime(TIEMPO_RONDA);
    }

    const togglePause = () => {
        setPaused(!isPaused);
    }

    const handleLeave = () => {
        navigate('/games');
    }

    const resetGame = () => {
        setCountdown(5);
        setShowCountdown(true);
        setGameOver(false);
    };

    useEffect(() => {
        if (showCountdown && !gameOver) {
            if (countdown > 0) {
                const timer = setTimeout(() => {
                    setCountdown(countdown - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                setShowCountdown(false);
                startGame();
            }
        }
    }, [countdown, showCountdown, gameOver]);

    useEffect(() => {
        if (!isPlaying || isPaused) return;

        const gameInterval = setInterval(() => {
            setGameTime((prev) => {
                if (prev <= 0.1) {
                    setisPlaying(false);
                    setGameOver(true);
                    return 0;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(gameInterval);
    }, [isPlaying, isPaused]);


    useEffect(() => {
        if (!isPlaying || isPaused || !isInterval) return;

        const gameInterval = setInterval(() => {
            setIntervalTime((prev) => {
                if (prev <= 0.1) {
                    generarNuevaRonda();
                    return TIEMPO_INTERVALO;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(gameInterval);
    }, [isPlaying, isPaused, isInterval, generarNuevaRonda]);

    useEffect(() => {
        if (!isPlaying || isPaused || isInterval) return;

        const roundInterval = setInterval(() => {
            setRoundTime((prev) => {
                if (prev <= 0.1) {
                    setIsInterval(true);
                    setCurrentColor("black");
                    return TIEMPO_RONDA
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(roundInterval);
    }, [isPlaying, isPaused, isInterval])

    return (
        <div className="game2-container" style={{
            backgroundColor: isPlaying && !gameOver ? currentColor : 'hsl(210, 30%, 98%)'
        }}>
            <div className="game-actions">
                {isPlaying && !gameOver && (
                    <button onClick={togglePause} className="action-button pause-button">{isPaused ? <Play size={20} /> : <Pause size={20} />}</button>
                )}
                <button onClick={handleLeave} className="action-button leave-button">
                    <LogOut size={20} />
                </button>
            </div>

            {showCountdown && !gameOver && (
                    <div className="countdown-screen">
                        <div className="countdown-content">
                            <h2 className="countdown-title">Ejercicio de Colores</h2>
                            <p className="countdown-subtitle">Memoriza los colores</p>
                            <div className="countdown-number">{countdown}</div>
                        </div>
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


            {gameOver && (
                <div className="gameover-screen">
                    <div className="gameover-card">
                        <h2>¡Juego Terminado!</h2>
                        <p className="gameover-message">Has completado el ejercicio</p>
                        <button onClick={startGame} className="restart-button">
                            Jugar de Nuevo
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}