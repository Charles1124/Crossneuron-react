import '/src/styles/game1-2.css';

export const Shape = ({ type, className = "", onClick }) => {

    const getShapePath = () => {
        switch (type) {
            case "circle":
                return (
                    <circle cx="50" cy="50" r="40" className="shape-circle" />
                )

            case "square":
                return (
                    <rect x="10" y="10" width="80" height="80" rx="8" className="shape-square" />
                )

            case "triangle":
                return (
                    <path d="M 50 10 L 90 90 L 10 90 Z" className="fill-shape-triangle" />
                );
            case "star":
                return (
                    <path
                        d="M 50 10 L 61 38 L 90 38 L 67 56 L 78 85 L 50 67 L 22 85 L 33 56 L 10 38 L 39 38 Z"
                        className="fill-shape-star"
                    />
                );
            case "hexagon":
                return (
                    <path
                        d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z"
                        className="fill-shape-hexagon"
                    />
                );

            default:
                return null;
        }
    }

    return (
        <svg viewBox="0 0 100 100" className={`shape ${onClick ? "shape-clickable" : ""} ${className}`} onClick={onClick}>
            {getShapePath()}
        </svg>
    )
}