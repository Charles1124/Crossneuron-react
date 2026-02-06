import { Circle, Triangle, Square } from "lucide-react";
import '/src/styles/game3.css';

const Pattern = ({ patternType, show }) => {
  if (!show) return null;

  const icons = {
    circle: Circle,
    triangle: Triangle,
    square: Square,
  };

  const labels = {
    circle: "Círculo",
    triangle: "Triángulo",
    square: "Cuadrado",
  };

  const Icon = icons[patternType];

  return (
    <div className="pattern-indicator">
      <Icon className="pattern-indicator-icon" size={20} />
      <span className="pattern-indicator-text">
        Patrón: <span className="pattern-indicator-value">{labels[patternType]}</span>
      </span>
    </div>
  );
};

export default Pattern;