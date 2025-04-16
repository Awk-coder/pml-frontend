import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let keys = {
      ctrl: false,
      shift: false,
      alt: false,
      x: false
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') keys.ctrl = true;
      if (e.key === 'Shift') keys.shift = true;
      if (e.key === 'Alt') keys.alt = true;
      if (e.key.toLowerCase() === 'x') keys.x = true;

      if (keys.ctrl && keys.shift && keys.alt && keys.x) {
        navigate('/admin');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') keys.ctrl = false;
      if (e.key === 'Shift') keys.shift = false;
      if (e.key === 'Alt') keys.alt = false;
      if (e.key.toLowerCase() === 'x') keys.x = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [navigate]);
}; 