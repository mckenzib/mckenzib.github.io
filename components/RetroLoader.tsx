import React, { useEffect, useState } from 'react';

interface RetroLoaderProps {
  gameName: string;
  theme: string;
  onComplete: () => void;
}

export const RetroLoader: React.FC<RetroLoaderProps> = ({ gameName, theme, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INIT...");

  useEffect(() => {
    const totalTime = 3000; // 3 seconds load
    const intervalTime = 50;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(newProgress);

      if (newProgress > 20 && newProgress < 50) setStatusText("LOADING...");
      if (newProgress >= 50 && newProgress < 80) setStatusText("BOOTING...");
      if (newProgress >= 80) setStatusText("STARTING...");
      if (newProgress >= 100) {
        setStatusText("READY");
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getColor = () => {
    if (theme === 'cyan') return 'text-cyan-400 border-cyan-500 bg-cyan-500';
    if (theme === 'orange') return 'text-orange-400 border-orange-500 bg-orange-500';
    if (theme === 'purple') return 'text-purple-400 border-purple-500 bg-purple-500';
    if (theme === 'red') return 'text-red-400 border-red-500 bg-red-500';
    if (theme === 'green') return 'text-green-400 border-green-500 bg-green-500';
    return 'text-green-400 border-green-500 bg-green-500';
  };
  
  const getBgColor = () => {
    if (theme === 'cyan') return 'bg-cyan-500';
    if (theme === 'orange') return 'bg-orange-500';
    if (theme === 'purple') return 'bg-purple-500';
    if (theme === 'red') return 'bg-red-500';
    if (theme === 'green') return 'bg-green-500';
    return 'bg-green-500';
  };

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center font-pixel p-4">
      
      {/* Scanlines on top of loader */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-50 opacity-50"></div>

      <div className="relative z-40 text-center w-full animate-flicker">
        <h2 className={`font-arcade text-xl md:text-2xl mb-4 animate-pulse ${getColor().split(' ')[0]}`}>
          {gameName}
        </h2>
        
        <div className="w-full max-w-[200px] mx-auto h-4 border-2 border-white p-0.5 mb-2 relative">
          <div 
            className={`h-full ${getBgColor()} transition-all duration-75 ease-linear`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-white text-lg tracking-widest mt-2 uppercase">
          {statusText}
        </p>

        <div className="mt-4 text-zinc-600 text-xs">
          MEM CHECK... OK
        </div>
      </div>
    </div>
  );
};