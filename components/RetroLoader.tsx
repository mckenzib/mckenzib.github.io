import React, { useEffect, useState } from 'react';

interface RetroLoaderProps {
  gameName: string;
  theme: string;
  onComplete: () => void;
  isNavigating: boolean;
}

export const RetroLoader: React.FC<RetroLoaderProps> = ({ gameName, theme, onComplete, isNavigating }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM");

  useEffect(() => {
    const totalTime = 2500; // 2.5 seconds load
    const intervalTime = 50;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(newProgress);

      if (newProgress > 20 && newProgress < 50) setStatusText("LOADING ASSETS...");
      if (newProgress >= 50 && newProgress < 80) setStatusText("CHECKING MEMORY...");
      if (newProgress >= 80) setStatusText("INSERTING CARTRIDGE...");
      if (newProgress >= 100) {
        setStatusText("READY!");
        clearInterval(interval);
        setTimeout(onComplete, 200);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getColor = () => {
    if (theme === 'cyan') return 'text-cyan-400 border-cyan-500 bg-cyan-500';
    if (theme === 'orange') return 'text-orange-400 border-orange-500 bg-orange-500';
    return 'text-green-400 border-green-500 bg-green-500';
  };
  
  const getBgColor = () => {
    if (theme === 'cyan') return 'bg-cyan-500';
    if (theme === 'orange') return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-pixel">
      
      {/* Scanlines on top of loader */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-50"></div>

      <div className={`relative z-40 text-center transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
        <h2 className={`font-arcade text-3xl md:text-5xl mb-8 animate-pulse ${getColor().split(' ')[0]}`}>
          {gameName}
        </h2>
        
        <div className="w-80 md:w-96 h-8 border-4 border-white p-1 mb-4 relative">
          <div 
            className={`h-full ${getBgColor()} transition-all duration-75 ease-linear`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-white text-xl tracking-widest mt-4 uppercase animate-flicker">
          {statusText}
        </p>

        <div className="mt-12 text-zinc-500 text-sm">
          VRAM: 64KB OK<br/>
          SOUND: YM2151 OK<br/>
          INPUT: DETECTED
        </div>
      </div>

      {/* Glitch effects purely visual */}
      <div className="absolute top-10 left-10 w-20 h-1 bg-white opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-1 bg-white opacity-10 animate-pulse"></div>
    </div>
  );
};