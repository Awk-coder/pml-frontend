import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
  backgroundColor?: string;
  className?: string;
}

const SquaresBackground: React.FC<SquaresProps> = ({
  direction = 'diagonal',
  speed = 0.5,
  squareSize = 40,
  borderColor = 'rgba(255, 255, 255, 0.3)',
  hoverFillColor = '#333',
  backgroundColor = '#000000',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>(0);
  const isHovering = useRef<boolean>(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    // Draw grid
    const drawGrid = () => {
      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate movement based on direction
      if (direction === 'right') offsetRef.current.x += speed;
      else if (direction === 'left') offsetRef.current.x -= speed;
      else if (direction === 'down') offsetRef.current.y += speed;
      else if (direction === 'up') offsetRef.current.y -= speed;
      else if (direction === 'diagonal') {
        offsetRef.current.x += speed;
        offsetRef.current.y += speed;
      }
      
      // Keep offset within square size to create seamless looping
      offsetRef.current.x = offsetRef.current.x % squareSize;
      offsetRef.current.y = offsetRef.current.y % squareSize;
      
      // Calculate grid dimensions
      const cols = Math.ceil(canvas.width / squareSize) + 1;
      const rows = Math.ceil(canvas.height / squareSize) + 1;
      
      // Draw grid lines
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      
      // Draw vertical lines
      for (let i = 0; i <= cols; i++) {
        const x = i * squareSize + offsetRef.current.x - squareSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let j = 0; j <= rows; j++) {
        const y = j * squareSize + offsetRef.current.y - squareSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Handle hover effect
      if (isHovering.current) {
        // Calculate which square the mouse is over
        const squareX = Math.floor((mousePosition.current.x - offsetRef.current.x) / squareSize) * squareSize + offsetRef.current.x;
        const squareY = Math.floor((mousePosition.current.y - offsetRef.current.y) / squareSize) * squareSize + offsetRef.current.y;
        
        // Draw filled square on hover
        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(squareX, squareY, squareSize, squareSize);
      }
      
      animationFrameId.current = requestAnimationFrame(drawGrid);
    };

    // Set up event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize
    handleResize();
    drawGrid();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [direction, speed, squareSize, borderColor, hoverFillColor, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default SquaresBackground; 