import React, { useState } from 'react';
import { Sparkles, Ghost, Cookie } from 'lucide-react';

interface ArcadeCabinetProps {
  title: string;
  description: string;
  color: 'cyan' | 'orange' | 'pink';
  path: string;
  onPlay: () => void;
  accentColor: string;
  isActive: boolean;
}

export const ArcadeCabinet: React.FC<ArcadeCabinetProps> = ({ 
  title, 
  description, 
  color, 
  onPlay, 
  accentColor,
  isActive
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
    }
  };

  const currentTheme = colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan;

  return (
    <div 
      className={`relative group transition-all duration-500 ease-out transform ${isActive ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed grayscale'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isActive && onPlay()}
    >
      {/* Cabinet Structure */}
      <div className={`
        w-64 md:w-80 h-[500px] md:h-[600px] 
        rounded-t-2xl 
        bg-zinc-900 
        border-4 ${currentTheme.border}
        flex flex-col
        relative
        z-20
        ${isHovered && isActive ? currentTheme.glow : ''}
        transition-shadow duration-300
      `}>
        
        {/* Marquee / Top Header */}
        <div className={`h-24 w-full ${currentTheme.bg} rounded-t-xl border-b-4 ${currentTheme.border} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <div className={`absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,${accentColor}_10px,${accentColor}_20px)]`}></div>
          <h2 className={`font-arcade text-xl md:text-2xl text-center px-2 leading-tight text-white z-20 drop-shadow-md ${isHovered && 'animate-pulse'}`}>
            {title}
          </h2>
        </div>

        {/* Screen Section */}
        <div className="flex-1 p-4 relative flex flex-col items-center justify-center">
            {/* Screen Bezel */}
            <div className="w-full h-full bg-zinc-800 rounded-lg p-2 shadow-inner inset-shadow-black">
                {/* Actual CRT Screen */}
                <div className={`w-full h-full ${currentTheme.screen} rounded border-2 border-black relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[inset_0_0_40px_rgba(${color === 'cyan' ? '34,211,238' : '249,115,22'},0.2)] transition-all duration-500`}>
                    
                    {/* Screen Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                       
                       {/* Icon */}
                       <div className={`mb-4 transition-transform duration-300 ${isHovered ? 'scale-125 rotate-6' : ''}`}>
                         {color === 'cyan' && <Ghost size={48} className="text-cyan-300" />}
                         {color === 'orange' && <Cookie size={48} className="text-orange-300" />}
                       </div>

                       {/* Insert Coin Text */}
                       <div className={`font-pixel text-2xl ${currentTheme.text} ${isHovered ? 'animate-bounce' : ''}`}>
                         {isHovered ? 'CLICK TO PLAY' : 'INSERT COIN'}
                       </div>
                       
                       {/* Scanline overlay specific to screen */}
                       <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] pointer-events-none opacity-60"></div>
                    </div>

                    {/* Screen Glare */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </div>

        {/* Control Panel */}
        <div className="h-32 w-full bg-zinc-800 border-t-4 border-zinc-700 relative skew-x-1 -ml-[1px] w-[calc(100%+2px)] flex items-center justify-center shadow-lg">
           {/* Joystick */}
           <div className="absolute left-8 top-1/3">
              <div className="w-4 h-12 bg-zinc-500 mx-auto rounded-full shadow-lg relative -top-4"></div>
              <div className="w-8 h-8 bg-red-600 rounded-full shadow-md absolute -top-8 left-1/2 -translate-x-1/2 border-b-4 border-red-800"></div>
              <div className="w-12 h-12 bg-black/50 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 blur-sm"></div>
           </div>

           {/* Buttons */}
           <div className="absolute right-8 top-1/3 flex gap-3">
              <div className={`w-8 h-8 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5)] border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all ${color === 'cyan' ? 'bg-cyan-500' : 'bg-yellow-500'}`}></div>
              <div className={`w-8 h-8 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5)] border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all mt-4 ${color === 'cyan' ? 'bg-pink-500' : 'bg-red-500'}`}></div>
           </div>
           
           {/* Start Buttons */}
           <div className="absolute bottom-2 w-full flex justify-center gap-4">
              <div className="flex flex-col items-center">
                  <div className="w-6 h-4 bg-white opacity-80"></div>
                  <span className="text-[8px] font-pixel mt-1 text-zinc-400">1P</span>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-6 h-4 bg-white opacity-80"></div>
                  <span className="text-[8px] font-pixel mt-1 text-zinc-400">2P</span>
              </div>
           </div>
        </div>
        
        {/* Coin Slot Area */}
        <div className="h-24 w-full bg-black rounded-b-xl flex items-center justify-center gap-8 border-t border-zinc-700">
            <div className="flex flex-col items-center">
               <div className="w-10 h-14 bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center mb-1">
                 <div className="w-1 h-8 bg-black"></div>
               </div>
               <div className={`w-2 h-2 ${currentTheme.bg} animate-pulse`}></div>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-10 h-14 bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center mb-1">
                 <div className="w-1 h-8 bg-black"></div>
               </div>
            </div>
        </div>
      </div>

      {/* Side Glow Reflection on Floor */}
      <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 ${currentTheme.bg} blur-xl opacity-40 rounded-full`}></div>
    </div>
  );
};