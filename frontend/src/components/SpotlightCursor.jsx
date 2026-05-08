import { useEffect } from 'react';

export default function SpotlightCursor() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update CSS variables on the root element
      // Using direct DOM manipulation for performance (avoiding React state updates)
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="spotlight-overlay" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-outline" aria-hidden="true" />
    </>
  );
}
