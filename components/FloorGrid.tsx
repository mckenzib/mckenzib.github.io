import React from 'react';

export const FloorGrid = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[50vh] overflow-hidden perspective-grid z-0 pointer-events-none">
      <div className="w-[200%] h-[100%] absolute -left-[50%] bottom-0 transform-style-3d rotate-x-60 animate-grid-move bg-transparent"
           style={{
             backgroundImage: `
               linear-gradient(rgba(236, 72, 153, 0.6) 1px, transparent 1px),
               linear-gradient(90deg, rgba(236, 72, 153, 0.6) 1px, transparent 1px)
             `,
             backgroundSize: '60px 60px',
             boxShadow: '0 0 100px rgba(236, 72, 153, 0.4) inset'
           }}>
      </div>
      
      <style>{`
        .perspective-grid {
          perspective: 600px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
          transform: rotateX(60deg);
        }
        @keyframes grid-move {
          0% { transform: rotateX(60deg) translateY(0); }
          100% { transform: rotateX(60deg) translateY(60px); }
        }
        .animate-grid-move {
          animation: grid-move 2s linear infinite;
        }
      `}</style>
    </div>
  );
};