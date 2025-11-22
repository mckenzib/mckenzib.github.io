import React, { useState } from 'react';
import { ArcadeCabinet } from './components/ArcadeCabinet';
import { FloorGrid } from './components/FloorGrid';
import { ArrowLeftCircle } from 'lucide-react';

export default function App() {
  const [loadingGame, setLoadingGame] = useState<{ name: string; path: string; theme: string } | null>(null);
  // activeGame tracks which game is currently running in a cabinet
  const [activeGame, setActiveGame] = useState<string | null>(null);
  // isExpanded tracks if the running game is in fullscreen mode
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGameSelect = (name: string, path: string, theme: string) => {
    if (activeGame === name) {
      // If already active, just expand it
      setIsExpanded(true);
    } else {
      // Otherwise start loading sequence
      setLoadingGame({ name, path, theme });
    }
  };

  const onLoadingComplete = () => {
    if (loadingGame) {
      setActiveGame(loadingGame.name);
      setLoadingGame(null);
    }
  };

  const handleReturnToArcade = () => {
    setIsExpanded(false);
  };

  return (
    <div className={`relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-between md:justify-center ${isExpanded ? '' : 'scanlines'} selection:bg-pink-500 selection:text-white py-6 md:py-0`}>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0"></div>
      <FloorGrid />

      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-pink-600/10 blur-[100px] z-0 pointer-events-none"></div>

      {/* Top Banner - Visible only when expanded */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] h-16 bg-zinc-900/90 border-b-2 border-pink-500 flex items-center justify-between px-4 md:px-8 transition-transform duration-300 ${isExpanded ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <button 
          onClick={handleReturnToArcade}
          className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors font-pixel text-xl group"
        >
          <ArrowLeftCircle className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          RETURN TO ARCADE ZONE
        </button>
        <div className="text-xs text-zinc-500 font-pixel hidden md:block">
          PLAYING: {activeGame}
        </div>
      </div>

      {/* Header Sign */}
      <div className={`z-10 text-center animate-flicker relative group cursor-default mt-2 md:mt-0 md:mb-12 shrink-0 transition-opacity duration-500 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <h1 className="font-arcade text-3xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">
          ARCADE ZONE
        </h1>
        <div className="absolute -inset-2 bg-pink-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Machines Container */}
      <div className={`z-10 w-full flex flex-row gap-8 md:gap-24 items-end overflow-x-auto md:overflow-visible pb-8 md:pb-10 perspective-1000 snap-x snap-mandatory no-scrollbar justify-start md:justify-center transition-opacity duration-500`}>
        
        {/* Wrapper divs maintain layout space when cabinet goes fixed/fullscreen */}
        
        {/* Cabinet 1: Spirited */}
        <div className="snap-center shrink-0 first:pl-[calc(50%-8rem)] md:first:pl-0 last:pr-[calc(50%-8rem)] md:last:pr-0 relative w-64 md:w-80 h-[450px] md:h-[600px]">
            <ArcadeCabinet
              title="SPIRITED"
              description="Journey through the ethereal plane."
              color="cyan"
              path="/spirited"
              onPlay={() => handleGameSelect('SPIRITED', '/spirited', 'cyan')}
              accentColor="#22d3ee"
              isActive={!loadingGame}
              isLoading={loadingGame?.name === 'SPIRITED'}
              onLoadingComplete={onLoadingComplete}
              isGameRunning={activeGame === 'SPIRITED'}
              isExpanded={isExpanded && activeGame === 'SPIRITED'}
              onExpand={() => setIsExpanded(true)}
            />
        </div>

        {/* Cabinet 2: Cookie's Escape */}
        <div className="snap-center shrink-0 first:pl-[calc(50%-8rem)] md:first:pl-0 last:pr-[calc(50%-8rem)] md:last:pr-0 relative w-64 md:w-80 h-[450px] md:h-[600px]">
            <ArcadeCabinet
              title="COOKIE'S ESCAPE"
              description="Help Cookie dodge the hungry mouths!"
              color="orange"
              path="/cookiesgreatescape"
              onPlay={() => handleGameSelect("COOKIE'S GREAT ESCAPE", '/cookiesgreatescape', 'orange')}
              accentColor="#f97316"
              isActive={!loadingGame}
              isLoading={loadingGame?.name === "COOKIE'S GREAT ESCAPE"}
              onLoadingComplete={onLoadingComplete}
              isGameRunning={activeGame === "COOKIE'S GREAT ESCAPE"}
              isExpanded={isExpanded && activeGame === "COOKIE'S GREAT ESCAPE"}
              onExpand={() => setIsExpanded(true)}
            />
        </div>

        {/* Cabinet 3: The Special Order */}
        <div className="snap-center shrink-0 first:pl-[calc(50%-8rem)] md:first:pl-0 last:pr-[calc(50%-8rem)] md:last:pr-0 relative w-64 md:w-80 h-[450px] md:h-[600px]">
            <ArcadeCabinet
              title="THE SPECIAL ORDER"
              description="Prepare the ultimate dish!"
              color="purple"
              path="/thespecialorder"
              onPlay={() => handleGameSelect("THE SPECIAL ORDER", '/thespecialorder', 'purple')}
              accentColor="#a855f7"
              isActive={!loadingGame}
              isLoading={loadingGame?.name === "THE SPECIAL ORDER"}
              onLoadingComplete={onLoadingComplete}
              isGameRunning={activeGame === "THE SPECIAL ORDER"}
              isExpanded={isExpanded && activeGame === "THE SPECIAL ORDER"}
              onExpand={() => setIsExpanded(true)}
            />
        </div>

         {/* Cabinet 4: Spirited 3D */}
         <div className="snap-center shrink-0 first:pl-[calc(50%-8rem)] md:first:pl-0 last:pr-[calc(50%-8rem)] md:last:pr-0 relative w-64 md:w-80 h-[450px] md:h-[600px]">
            <ArcadeCabinet
              title="SPIRITED 3D"
              description="Enter the third dimension!"
              color="green"
              path="/spirited/3d.html"
              onPlay={() => handleGameSelect("SPIRITED 3D", '/spirited/3d.html', 'green')}
              accentColor="#4ade80"
              isActive={!loadingGame}
              isLoading={loadingGame?.name === "SPIRITED 3D"}
              onLoadingComplete={onLoadingComplete}
              isGameRunning={activeGame === "SPIRITED 3D"}
              isExpanded={isExpanded && activeGame === "SPIRITED 3D"}
              onExpand={() => setIsExpanded(true)}
            />
        </div>

      </div>

      {/* Footer Text */}
      <div className={`relative md:fixed bottom-4 left-0 right-0 text-center z-10 opacity-60 shrink-0 mb-2 md:mb-0 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-60'}`}>
         <p className="font-pixel text-sm md:text-lg text-green-400 tracking-widest">INSERT COIN TO START • © 1985</p>
      </div>

       <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}