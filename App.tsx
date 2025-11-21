import React, { useState, useEffect } from 'react';
import { ArcadeCabinet } from './components/ArcadeCabinet';
import { RetroLoader } from './components/RetroLoader';
import { FloorGrid } from './components/FloorGrid';

export default function App() {
  const [loadingGame, setLoadingGame] = useState<{ name: string; path: string; theme: string } | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleGameSelect = (name: string, path: string, theme: string) => {
    setLoadingGame({ name, path, theme });
  };

  const onLoadingComplete = () => {
    if (loadingGame) {
      setIsNavigating(true);
      // Simulate a small delay before "redirecting" to show the final state
      setTimeout(() => {
        window.location.href = loadingGame.path;
      }, 500);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center scanlines selection:bg-pink-500 selection:text-white">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0"></div>
      <FloorGrid />

      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-pink-600/10 blur-[100px] z-0 pointer-events-none"></div>

      {/* Header Sign */}
      <div className="z-10 mb-12 text-center animate-flicker relative group cursor-default">
        <h1 className="font-arcade text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">
          ARCADE ZONE
        </h1>
        <div className="absolute -inset-2 bg-pink-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Machines Container */}
      <div className="z-10 flex flex-col md:flex-row gap-12 md:gap-24 items-end pb-10 perspective-1000">
        
        <ArcadeCabinet
          title="SPIRITED"
          description="Journey through the ethereal plane."
          color="cyan"
          path="/spirited"
          onPlay={() => handleGameSelect('SPIRITED', '/spirited', 'cyan')}
          accentColor="#22d3ee"
          isActive={!loadingGame}
        />

        <ArcadeCabinet
          title="COOKIE'S ESCAPE"
          description="Help Cookie dodge the hungry mouths!"
          color="orange"
          path="/cookiesgreatescape"
          onPlay={() => handleGameSelect("COOKIE'S GREAT ESCAPE", '/cookiesgreatescape', 'orange')}
          accentColor="#f97316"
          isActive={!loadingGame}
        />

      </div>

      {/* Footer Text */}
      <div className="fixed bottom-4 left-0 right-0 text-center z-10 opacity-60">
         <p className="font-pixel text-lg text-green-400 tracking-widest">INSERT COIN TO START • © 1985</p>
      </div>

      {/* Loading Overlay */}
      {loadingGame && (
        <RetroLoader 
          gameName={loadingGame.name} 
          theme={loadingGame.theme}
          onComplete={onLoadingComplete}
          isNavigating={isNavigating}
        />
      )}
    </div>
  );
}