import React, { useState } from 'react';
import { Ghost, Cookie, Maximize2 } from 'lucide-react';
import { RetroLoader } from './RetroLoader';

// Custom Onion Icon since standard libraries might lack a specific one
const OnionIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z" />
    <path d="M12 2a15 15 0 0 1 5 10 15 15 0 0 1-5 10" />
    <path d="M12 2a15 15 0 0 0-5 10 15 15 0 0 0 5 10" />
    <path d="M12 2v20" />
  </svg>
);

interface ArcadeCabinetProps {
  title: string;
  description: string;
  color: 'cyan' | 'orange' | 'pink' | 'purple';
  path: string;
  onPlay: () => void;
  accentColor: string;
  isActive: boolean;
  isLoading: boolean;
  onLoadingComplete: () => void;
  isGameRunning: boolean;
  isExpanded: boolean;
  onExpand: () => void;
}

export const ArcadeCabinet: React.FC<ArcadeCabinetProps> = ({ 
  title, 
  description, 
  color, 
  path,
  onPlay, 
  accentColor,
  isActive,
  isLoading,
  onLoadingComplete,
  isGameRunning,
  isExpanded,
  onExpand
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [screenHovered, setScreenHovered] = useState(false);

  const colorClasses = {
    cyan: {
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.4)]',
      border: 'border-cyan-500',
      text: 'text-cyan-400',
      bg: 'bg-cyan-900',
      screen: 'bg-cyan-950'
    },
    orange: {
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.4)]',
      border: 'border-orange-500',
      text: 'text-orange-400',
      bg: 'bg-orange-900',
      screen: 'bg-orange-950'
    },
    pink: {
      glow: 'shadow-[0_0_30px_rgba(236,72,153,0.4)]',
      border: 'border-pink-500',
      text: 'text-pink-400',
      bg: 'bg-pink-900',
      screen: 'bg-pink-950'
    },
    purple: {
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.4)]',
      border: 'border-purple-500',
      text: 'text-purple-400',
      bg: 'bg-purple-900',
      screen: 'bg-purple-950'
    }
  };

  const currentTheme = colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan;

  // When expanded, we break out of the relative positioning to fill the screen
  // This preserves the iframe in the DOM tree, preventing a reload
  // Updated to top-16 to account for the 4rem (h-16) header banner
  const containerClass = isExpanded
    ? "fixed top-16 bottom-0 left-0 right-0 z-50 bg-black flex flex-col items-center justify-center animate-in fade-in duration-300"
    : `relative group transition-all duration-500 ease-out transform w-full h-full flex flex-col ${isActive && !isGameRunning && !isLoading ? 'cursor-pointer hover:scale-105' : ''} ${!isActive && !isGameRunning && !isLoading ? 'opacity-50 cursor-not-allowed grayscale' : ''}`;

  return (
    <div 
      className={containerClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isActive && !isGameRunning && !isLoading && onPlay()}
    >
      {/* Cabinet Chassis - Hidden when Expanded */}
      <div className={`
        ${isExpanded ? 'hidden' : 'block'}
        absolute inset-0 rounded-t-2xl bg-zinc-900 border-4 ${currentTheme.border} z-0
        ${isHovered && isActive && !isGameRunning && !isLoading ? currentTheme.glow : ''}
        transition-shadow duration-300
      `}></div>

      {/* Marquee / Top Header - Hidden when Expanded */}
      <div className={`${isExpanded ? 'hidden' : 'flex'} z-10 h-20 md:h-24 ${currentTheme.bg} rounded-t-xl border-b-4 ${currentTheme.border} items-center justify-center relative overflow-hidden shrink-0 mx-auto mt-1 w-[calc(100%-8px)]`}>
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className={`absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,${accentColor}_10px,${accentColor}_20px)]`}></div>
        <h2 className={`font-arcade text-lg md:text-2xl text-center px-2 leading-tight text-white z-20 drop-shadow-md ${isHovered && !isGameRunning && 'animate-pulse'}`}>
          {title}
        </h2>
      </div>

      {/* Screen Section - Grows to fill when expanded */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-0 transition-all duration-500 ${isExpanded ? 'w-full h-full p-0' : 'w-full flex-1 p-3 md:p-4'}`}>
          
          {/* Screen Bezel - Hidden borders when expanded */}
          <div className={`w-full h-full bg-zinc-800 rounded-lg relative shadow-inner inset-shadow-black flex flex-col ${isExpanded ? 'rounded-none p-0 bg-black' : 'p-2'}`}>
              
              {/* Actual Screen Container */}
              <div 
                 className={`
                   relative overflow-hidden
                   ${isExpanded 
                      ? 'w-full h-full border-none' 
                      : `w-full h-full rounded border-2 border-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] ${currentTheme.screen}`
                   }
                   bg-black
                 `}
                 onMouseEnter={() => setScreenHovered(true)}
                 onMouseLeave={() => setScreenHovered(false)}
              >
                  {isLoading && (
                    <RetroLoader 
                        gameName={title} 
                        theme={color} 
                        onComplete={onLoadingComplete} 
                    />
                  )}

                  {isGameRunning ? (
                    <>
                      {/* The Game Iframe */}
                      <iframe 
                        src={path} 
                        className={`w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        title={title}
                      />
                      
                      {/* Click Overlay (Only visible when NOT expanded) */}
                      {!isExpanded && !isLoading && (
                        <div 
                          className="absolute inset-0 z-20 bg-black/10 hover:bg-black/40 cursor-pointer flex items-center justify-center transition-colors duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            onExpand();
                          }}
                        >
                          {screenHovered && (
                            <div className="flex flex-col items-center animate-bounce">
                              <Maximize2 className="w-12 h-12 text-white mb-2 drop-shadow-lg" />
                              <span className="font-pixel text-white text-2xl drop-shadow-md tracking-widest bg-black/50 px-2">EXPAND</span>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Default "Insert Coin" Screen Content - Only shown if not loading and not playing */
                    !isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 md:p-4 z-10">
                            {/* Icon */}
                            <div className={`mb-2 md:mb-4 transition-transform duration-300 ${isHovered ? 'scale-125 rotate-6' : ''}`}>
                              {color === 'cyan' && <Ghost className="w-8 h-8 md:w-12 md:h-12 text-cyan-300" />}
                              {color === 'orange' && <Cookie className="w-8 h-8 md:w-12 md:h-12 text-orange-300" />}
                              {color === 'purple' && <OnionIcon className="w-8 h-8 md:w-12 md:h-12 text-purple-300" />}
                            </div>

                            {/* Insert Coin Text */}
                            <div className={`font-pixel text-xl md:text-2xl ${currentTheme.text} ${isHovered ? 'animate-bounce' : ''}`}>
                            {isHovered ? 'CLICK TO PLAY' : 'INSERT COIN'}
                            </div>
                            
                            {/* Scanline overlay specific to screen */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] pointer-events-none opacity-60"></div>
                        </div>
                    )
                  )}

                  {/* Screen Glare (Only when not expanded) */}
                  {!isExpanded && (
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
                  )}
              </div>
          </div>
      </div>

      {/* Control Panel - Hidden when expanded */}
      <div className={`${isExpanded ? 'hidden' : 'flex'} z-10 h-28 md:h-32 w-full bg-zinc-800 border-t-4 border-zinc-700 relative skew-x-1 -ml-[1px] w-[calc(100%+2px)] items-center justify-center shadow-lg shrink-0 mx-auto`}>
         {/* Joystick */}
         <div className="absolute left-6 md:left-8 top-1/3">
            <div className="w-3 md:w-4 h-10 md:h-12 bg-zinc-500 mx-auto rounded-full shadow-lg relative -top-4"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-600 rounded-full shadow-md absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 border-b-4 border-red-800"></div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black/50 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 blur-sm"></div>
         </div>

         {/* Buttons */}
         <div className="absolute right-6 md:right-8 top-1/3 flex gap-2 md:gap-3">
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5)] border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all ${color === 'cyan' ? 'bg-cyan-500' : color === 'purple' ? 'bg-purple-500' : 'bg-yellow-500'}`}></div>
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5)] border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all mt-3 md:mt-4 ${color === 'cyan' ? 'bg-pink-500' : color === 'purple' ? 'bg-green-500' : 'bg-red-500'}`}></div>
         </div>
         
         {/* Start Buttons */}
         <div className="absolute bottom-2 w-full flex justify-center gap-4">
            <div className="flex flex-col items-center">
                <div className="w-5 h-3 md:w-6 md:h-4 bg-white opacity-80"></div>
                <span className="text-[6px] md:text-[8px] font-pixel mt-1 text-zinc-400">1P</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-5 h-3 md:w-6 md:h-4 bg-white opacity-80"></div>
                <span className="text-[6px] md:text-[8px] font-pixel mt-1 text-zinc-400">2P</span>
            </div>
         </div>
      </div>
      
      {/* Coin Slot Area - Hidden when expanded */}
      <div className={`${isExpanded ? 'hidden' : 'flex'} z-10 h-20 md:h-24 w-[calc(100%-8px)] mx-auto bg-black rounded-b-xl items-center justify-center gap-8 border-t border-zinc-700 shrink-0 border-x-4 border-b-4 ${currentTheme.border}`}>
          <div className="flex flex-col items-center">
             <div className="w-8 h-10 md:w-10 md:h-14 bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center mb-1">
               <div className="w-1 h-6 md:h-8 bg-black"></div>
             </div>
             <div className={`w-2 h-2 ${currentTheme.bg} animate-pulse`}></div>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-8 h-10 md:w-10 md:h-14 bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center mb-1">
               <div className="w-1 h-6 md:h-8 bg-black"></div>
             </div>
          </div>
      </div>

      {/* Side Glow Reflection on Floor - Hidden when expanded */}
      <div className={`${isExpanded ? 'hidden' : 'block'} absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 ${currentTheme.bg} blur-xl opacity-40 rounded-full`}></div>
    </div>
  );
};