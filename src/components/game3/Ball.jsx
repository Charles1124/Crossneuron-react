import '/src/styles/game3.css';

export const Ball = ({ x, y, size=60 }) => {
    return(
        <div className="ball ball-shape" 
        style={{ width: size, height: size, 
            left: x, top: y, transform: `translate(-50%, -50%)`,
        }}/>
    )
}
