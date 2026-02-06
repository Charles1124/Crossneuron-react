/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "/src/styles/game1-2.css";
import { Pause, Play, LogOut, Settings } from "lucide-react";

export const Game2 = () => {

    const navigate = useNavigate();

    const [configGameTime, setConfigGameTime] = useState(20);
    const [configRoundTime, setConfigRoundTime] = useState(5);
    const [configIntervalTime, setConfigIntervalTime] = useState(5);

    const [isPaused, setPaused] = useState(false);
    const [currentColor, setCurrentColor] = useState("black");
    const [isInterval, setIsInterval] = useState(false);
    const [gameTime, setGameTime] = useState(configGameTime);
    const [roundTime, setRoundTime] = useState(configRoundTime);
    const [intervalTime, setIntervalTime] = useState(configIntervalTime);
    const [isPlaying, setisPlaying] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
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
        setRoundTime(configRoundTime);
        setIntervalTime(configIntervalTime);
    }, [configRoundTime, configIntervalTime]);

    const startGame = () => {
        setIsInterval(false);
        setGameTime(configGameTime);
        setRoundTime(configRoundTime)
        setisPlaying(true)
        setGameOver(false)
        setCurrentColor(getRandomColor);
        setIntervalTime(configIntervalTime);
    }

    const togglePause = () => {
        setPaused(!isPaused);
    }

    const handleLeave = () => {
        navigate('/games');
    }

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    }

    useEffect(() => {
        if (showCountdown && !gameOver) {
            if (settingsOpen === false) {
                if (countdown > 0) {
                    const timer = setTimeout(() => {
                        setCountdown(countdown - 1);
                    }, 1000);
                    return () => clearTimeout(timer);
                } else {
                    setShowCountdown(false);
                    startGame();
                }
            } else {
                return;
            }
        }
    }, [countdown, showCountdown, gameOver, settingsOpen]);

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
                    return configIntervalTime;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(gameInterval);
    }, [isPlaying, isPaused, isInterval, generarNuevaRonda, configIntervalTime]);

    useEffect(() => {
        if (!isPlaying || isPaused || isInterval) return;

        const roundInterval = setInterval(() => {
            setRoundTime((prev) => {
                if (prev <= 0.1) {
                    setIsInterval(true);
                    setCurrentColor("black");
                    return configRoundTime;
                }
                return prev - 0.1;
            });
        }, 100);
        return () => clearInterval(roundInterval);
    }, [isPlaying, isPaused, isInterval, configRoundTime])

    useEffect(() => {
        if (isPlaying || gameOver) {
            setSettingsOpen(false);
        }
    }, [isPlaying, gameOver]);

    return (
        <div className="game2-container" style={{
            backgroundColor: isPlaying && !gameOver ? currentColor : 'hsl(210, 30%, 98%)'
        }}>
            <div className="game-actions">
                {isPlaying && !gameOver && (
                    <button onClick={togglePause} className="action-button pause-button">{isPaused ? <Play size={20} /> : <Pause size={20} />}</button>
                )}
                {!(isPlaying && !gameOver) && (
                    <button onClick={toggleSettings} className="action-button settings-button"><Settings size={20} /></button>
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

            {settingsOpen && !(isPlaying && !gameOver) && (
                <div className="settings-overlay">
                    <div className="settings-card">
                        <h2>Configure los tiempos</h2>
                        <input className="input-game-time" type="number" min="10" max="999" placeholder="Segundos del juego" value={configGameTime}
                            onChange={(e) => setConfigGameTime(Number(e.target.value))}></input>
                        <input type="number" className="input-round-time" min="1" max="99" placeholder="Segundos por color" value={configRoundTime}
                            onChange={(e) => setConfigRoundTime(Number(e.target.value))}></input>
                        <input type="number" className="input-intervañ-time" min="1" max="99" placeholder="Segundos por intervalo" value={configIntervalTime}
                            onChange={(e) => setConfigIntervalTime(Number(e.target.value))}></input>
                        <button onClick={toggleSettings} className="close-settings">
                            Cerrar
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