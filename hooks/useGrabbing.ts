import { useRef, useState, useEffect } from 'react';

const useGrabbing = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      setIsGrabbing(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isGrabbing) return;
      setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      setIsGrabbing(false);
    };

    board.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      board.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isGrabbing, position, startPos]);

  return { boardRef, isGrabbing, position };
};

export default useGrabbing;
