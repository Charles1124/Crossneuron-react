import { useEffect, useRef, useState, useCallback } from "react";
import { Ball } from "./Ball";
import '/src/styles/game3.css';

const BALL_SIZE = 70;
const ARENA_PADDING = 50;
const PATTERN_RADIUS = 80;
const BASE_PATTERN_SPEED = 0.015;
const BASE_RANDOM_SPEED = 1.5;

const GameArena = ({
  isPlaying,
  patternBalls,
  patternType,
  speed = 2,
}) => {
  const patternSpeed = BASE_PATTERN_SPEED * speed;
  const randomSpeed = BASE_RANDOM_SPEED * speed;
  const arenaRef = useRef(null);
  const animationRef = useRef();
  const timeRef = useRef(0);
  const randomDirectionsRef = useRef([]);

  const [balls, setBalls] = useState([
    { id: 0, x: 0, y: 0, isPattern: false },
    { id: 1, x: 0, y: 0, isPattern: false },
    { id: 2, x: 0, y: 0, isPattern: false },
  ]);

  const [arenaDimensions, setArenaDimensions] = useState({ width: 600, height: 400 });
  const patternCentersRef = useRef([]);

  // Establecer las dimensiones de la arena y posición de las pelotas.
  useEffect(() => {
    const updateDimensions = () => {
      if (arenaRef.current) {
        const { width, height } = arenaRef.current.getBoundingClientRect();
        setArenaDimensions({ width, height });

        // Iniciar posiciones random
        const centerX = width / 2;
        const centerY = height / 2;
        
        setBalls((prev) =>
          prev.map((ball, index) => ({
            ...ball,
            x: centerX + (index - 1) * 120,
            y: centerY,
            isPattern: patternBalls.includes(ball.id),
          }))
        );

        // Inicializar patrones para cada pelota elegida.
        patternCentersRef.current = patternBalls.map((_, index) => ({
          x: centerX + (index === 0 ? -100 : 100),
          y: centerY,
        }));

        // Inicializar patrones random para pelotas distractoras. 
        randomDirectionsRef.current = [0, 1, 2].map(() => {
          const angle = Math.random() * Math.PI * 2;
          return {
            vx: Math.cos(angle) * randomSpeed,
            vy: Math.sin(angle) * randomSpeed,
          };
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [patternBalls, randomSpeed]);

  // Actualizar isPattern
  useEffect(() => {
    setBalls((prev) =>
      prev.map((ball) => ({
        ...ball,
        isPattern: patternBalls.includes(ball.id),
      }))
    );
  }, [patternBalls]);

  const getPatternPosition = useCallback(
    (time, centerX, centerY, patternIndex) => {
      const offset = patternIndex * (Math.PI / 2); 
      
      //Patrón círculo
      switch (patternType) {
        case "circle": {
          return {
            x: centerX + Math.cos(time + offset) * PATTERN_RADIUS,
            y: centerY + Math.sin(time + offset) * PATTERN_RADIUS,
          };
        }
        case "triangle": {
          // Patrón triangulo.
          const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
          const vertices = [
            { x: 0, y: -PATTERN_RADIUS },
            { x: PATTERN_RADIUS * 0.866, y: PATTERN_RADIUS * 0.5 },
            { x: -PATTERN_RADIUS * 0.866, y: PATTERN_RADIUS * 0.5 },
          ];
          
          const segment = Math.floor(t * 3);
          const segmentProgress = (t * 3) % 1;
          const from = vertices[segment];
          const to = vertices[(segment + 1) % 3];
          
          return {
            x: centerX + from.x + (to.x - from.x) * segmentProgress,
            y: centerY + from.y + (to.y - from.y) * segmentProgress,
          };
        } 
        //Patrón Cuadrado
        case "square": {
          const t = ((time + offset) % (Math.PI * 2)) / (Math.PI * 2);
          const halfSize = PATTERN_RADIUS * 0.8;
          const vertices = [
            { x: -halfSize, y: -halfSize },
            { x: halfSize, y: -halfSize },
            { x: halfSize, y: halfSize },
            { x: -halfSize, y: halfSize },
          ];
          
          const segment = Math.floor(t * 4);
          const segmentProgress = (t * 4) % 1;
          const from = vertices[segment];
          const to = vertices[(segment + 1) % 4];
          
          return {
            x: centerX + from.x + (to.x - from.x) * segmentProgress,
            y: centerY + from.y + (to.y - from.y) * segmentProgress,
          };
        }
        default:
          return { x: centerX, y: centerY };
      }
    },
    [patternType]
  );

  const updateRandomBall = useCallback(
    (ball, index) => {
      const dir = randomDirectionsRef.current[index];
      if (!dir) return ball;

      let newX = ball.x + dir.vx;
      let newY = ball.y + dir.vy;

      // Rebote en las paredes.
      const minX = ARENA_PADDING + BALL_SIZE / 2;
      const maxX = arenaDimensions.width - ARENA_PADDING - BALL_SIZE / 2;
      const minY = ARENA_PADDING + BALL_SIZE / 2;
      const maxY = arenaDimensions.height - ARENA_PADDING - BALL_SIZE / 2;

      if (newX <= minX || newX >= maxX) {
        dir.vx *= -1;
        newX = Math.max(minX, Math.min(maxX, newX));
        
        dir.vy += (Math.random() - 0.5) * 0.5;
      }
      if (newY <= minY || newY >= maxY) {
        dir.vy *= -1;
        newY = Math.max(minY, Math.min(maxY, newY));
        dir.vx += (Math.random() - 0.5) * 0.5;
      }

     
      const currentSpeed = Math.sqrt(dir.vx * dir.vx + dir.vy * dir.vy);
      if (currentSpeed > randomSpeed * 1.5) {
        dir.vx = (dir.vx / currentSpeed) * randomSpeed;
        dir.vy = (dir.vy / currentSpeed) * randomSpeed;
      }

      return { ...ball, x: newX, y: newY };
    },
    [arenaDimensions, randomSpeed]
  );

 
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      timeRef.current += patternSpeed;

      setBalls((prev) => {
        let patternIndex = 0;
        return prev.map((ball, index) => {
          if (ball.isPattern) {
            const center = patternCentersRef.current[patternIndex] || {
              x: arenaDimensions.width / 2,
              y: arenaDimensions.height / 2,
            };
            const pos = getPatternPosition(timeRef.current, center.x, center.y, patternIndex);
            patternIndex++;
            return { ...ball, x: pos.x, y: pos.y };
          } else {
            return updateRandomBall(ball, index);
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, getPatternPosition, updateRandomBall, arenaDimensions, patternSpeed]);

  return (
    <div
      ref={arenaRef}
      className="game-arena"
    >
      
      <div className="arena-grid-overlay">
        <div
          className="arena-grid-pattern"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(222, 47%, 11%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(222, 47%, 11%) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {balls.map((ball) => (
        <Ball
          key={ball.id}
          id={ball.id}
          x={ball.x}
          y={ball.y}
          size={BALL_SIZE}
        />
      ))}
    </div>
  );
};

export default GameArena;