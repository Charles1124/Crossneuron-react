import '/src/styles/game1.css';

export const Timer= ({ label, time, maxTime, variant= "game"}) => {
    const percent= (time/maxTime) * 100; 
    const low= percent < 30;
    const medium= percent >= 30 && percent < 60; 

    return(
        <div className={`timer-container ${variant === "game" ? "timer-game" : "timer-round"}`}>
            <div className="timer-label">
                {label}
            </div>
            <div className="timer-display">
                <div className={`timer-value ${low ? "timer-danger" : ""} ${medium ? "timer-warning" : ""}`}>
                    {Math.ceil(time)}
                </div>
                <div className="timer-unit">s</div>
            </div>
            <div className="timer-bar-container">
                <div className={`timer-bar-fill ${low ? "timer-bar-danger" : ""} ${medium ? "timer-bar-warning" : ""}`} 
                style={{ width: `${percent}%` }}/>
            </div>
        </div>
    )
}