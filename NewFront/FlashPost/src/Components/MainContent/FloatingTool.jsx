import React, { useState, useEffect } from 'react';
import ToolBar from './ToolBar';


const FloatingTool = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed bottom-4 bg-whit left-[54%] -translate-x-56  z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div>
        <ToolBar />
      </div>
    </div>
  );
};

export default FloatingTool;

