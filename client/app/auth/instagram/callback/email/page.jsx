'use client'

import { useState, useEffect, useRef } from 'react';

export default function FullscreenOnScrollUp() {
  const targetElementRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY && currentScrollY < targetElementRef.current.offsetTop) {
        // Scrolled up and above the target element's top
        if (!isFullscreen && targetElementRef.current) {
          requestFullscreen(targetElementRef.current);
          setIsFullscreen(true);
        }
      } else if (currentScrollY > lastScrollY && isFullscreen) {
        // Scrolled down, exit fullscreen
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // For Safari
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);    // For Firefox
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);     // For IE/Edge (legacy)

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isFullscreen, lastScrollY]);

  const requestFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    }
  };

  return (
    <div>
      {/* Other content on your page */}
      <div ref={targetElementRef} style={{ border: '1px solid black', padding: '20px', height: '500px', backgroundColor: 'lightblue' }}>
        {isFullscreen ? (
          <h1>Fullscreen Active!</h1>
        ) : (
          <h1>Scroll up to make this fullscreen</h1>
        )}
        {/* Content of the element you want to make fullscreen */}
      </div>
      {/* More content below */}
    </div>
  );
}