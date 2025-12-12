import React, { useState, useEffect, useRef } from 'react';
import { ArcadeCabinet } from './components/ArcadeCabinet';
import { FloorGrid } from './components/FloorGrid';
import { ArrowLeftCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// Game Configuration Data
const GAMES = [
  {
    id: "PIXEL VOID",
    title: "PIXEL VOID",
    description: "Stare into the abyss...",
    color: "blue",
    path: "/pixelvoid",
    accentColor: "#3b82f6"
  },
  {
    id: "VECTOR VENGEANCE",
    title: "VECTOR VENGEANCE",
    description: "Battle in the neon arena!",
    color: "yellow",
    path: "/vectorvengeance",
    accentColor: "#eab308"
  },
  {
    id: "THE SPECIAL ORDER",
    title: "THE SPECIAL ORDER",
    description: "Prepare the ultimate dish!",
    color: "purple",
    path: "/thespecialorder",
    accentColor: "#a855f7"
  },
  {
    id: "COOKIE'S GREAT ESCAPE",
    title: "COOKIE'S ESCAPE",
    description: "Help Cookie dodge the hungry mouths!",
    color: "orange",
    path: "/cookiesgreatescape",
    accentColor: "#f97316"
  },
  {
    id: 'SPIRITED',
    title: "SPIRITED",
    description: "Journey through the ethereal plane.",
    color: "cyan",
    path: "/spirited",
    accentColor: "#22d3ee"
  },
  {
    id: "SPIRITED 3D",
    title: "SPIRITED 3D",
    description: "Enter the third dimension!",
    color: "green",
    path: "/spirited/3d.html",
    accentColor: "#4ade80"
  }
] as const;

export default function App() {
  const [loadingGame, setLoadingGame] = useState<{ name: string; path: string; theme: string } | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Carousel State
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  
  // Responsive Dimensions State
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Constants for Carousel Math
  const isDesktop = windowWidth >= 768;
  const ITEM_WIDTH = isDesktop ? 320 : 256; // w-80 vs w-64
  const GAP = isDesktop ? 96 : 32;          // md:mr-24 vs mr-8

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExpanded) return;
      
      if (e.key === 'ArrowRight') {
        setSelectedIndex(prev => Math.min(prev + 1, GAMES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        const game = GAMES[selectedIndex];
        handleGameSelect(game.id, game.path, game.color);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, selectedIndex]);

  // Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) { // Threshold for swipe
      if (diff > 0) {
        // Swipe Left -> Next
        setSelectedIndex(prev => Math.min(prev + 1, GAMES.length - 1));
      } else {
        // Swipe Right -> Prev
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }
    }
    touchStartX.current = null;
  };

  const handleGameSelect = (name: string, path: string, theme: string) => {
    if (activeGame === name) {
      setIsExpanded(true);
    } else {
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

  // Calculate position to center the selected item
  // We use margin-left on the track which is positioned at left: 50%
  // Shift = -1 * ( (index * (width + gap)) + (width/2) )
  const trackOffset = -1 * (selectedIndex * (ITEM_WIDTH + GAP) + (ITEM_WIDTH / 2));

  return (
    <div 
      className={`relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-between md:justify-center ${isExpanded ? '' : 'scanlines'} selection:bg-pink-500 selection:text-white py-6 md:py-0`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
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

      {/* Navigation Buttons (Desktop) */}
      <div className={`hidden md:flex fixed inset-y-0 left-0 items-center px-4 z-20 transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={() => setSelectedIndex(prev => Math.max(prev - 1, 0))}
          disabled={selectedIndex === 0}
          className="p-2 rounded-full bg-black/50 border-2 border-zinc-700 text-white hover:bg-pink-900/50 hover:border-pink-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
        >
          <ChevronLeft className="w-12 h-12" />
        </button>
      </div>
      <div className={`hidden md:flex fixed inset-y-0 right-0 items-center px-4 z-20 transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={() => setSelectedIndex(prev => Math.min(prev + 1, GAMES.length - 1))}
          disabled={selectedIndex === GAMES.length - 1}
          className="p-2 rounded-full bg-black/50 border-2 border-zinc-700 text-white hover:bg-pink-900/50 hover:border-pink-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
        >
          <ChevronRight className="w-12 h-12" />
        </button>
      </div>

      {/* Machines Container (Carousel) */}
      {/* 
         We use a wrapper with relative positioning. 
         The track inside uses absolute + left: 50% + margin-left to center items.
         We REMOVED perspective-1000 from here to allow 'fixed' children (expanded view) 
         to properly break out to the viewport context.
      */}
      <div className={`z-10 w-full h-[450px] md:h-[600px] relative transition-opacity duration-500`}>
        <div 
            className="absolute left-1/2 bottom-0 h-full flex items-end transition-all duration-500 ease-out"
            style={{ marginLeft: `${trackOffset}px` }}
        >
          {GAMES.map((game, index) => (
            <div 
                key={game.id}
                className={`shrink-0 relative h-full transition-all duration-500`}
                style={{ 
                    width: `${ITEM_WIDTH}px`,
                    marginRight: index === GAMES.length - 1 ? 0 : `${GAP}px`
                }}
            >
              <ArcadeCabinet
                title={game.title}
                description={game.description}
                color={game.color as any}
                path={game.path}
                onPlay={() => handleGameSelect(game.id, game.path, game.color)}
                onSelect={() => setSelectedIndex(index)}
                isSelected={index === selectedIndex}
                accentColor={game.accentColor}
                isActive={!loadingGame}
                isLoading={loadingGame?.name === game.id}
                onLoadingComplete={onLoadingComplete}
                isGameRunning={activeGame === game.id}
                isExpanded={isExpanded && activeGame === game.id}
                onExpand={() => setIsExpanded(true)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <div className={`relative md:fixed bottom-4 left-0 right-0 text-center z-10 opacity-60 shrink-0 mb-2 md:mb-0 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-60'}`}>
         <p className="font-pixel text-sm md:text-lg text-green-400 tracking-widest">
           {GAMES[selectedIndex].description}
         </p>
         <p className="text-xs text-zinc-500 mt-1">Use Arrows to Navigate • Enter to Start</p>
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