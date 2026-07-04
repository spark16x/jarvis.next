import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-950">
      <div className="relative flex items-center justify-center">
        {/* Sleek pulsing core */}
        <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase animate-pulse">J</span>
        </div>
        {/* Muted spinning accent ring */}
        <div className="absolute w-16 h-16 rounded-full border-t border-r border-zinc-700 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;