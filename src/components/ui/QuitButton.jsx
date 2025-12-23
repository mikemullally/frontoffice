import React, { useState } from 'react';

export default function QuitButton({ onQuit }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-slate-900 border border-white/10 p-8 max-w-md w-full mx-4">
          <h2 
            className="text-xl font-bold text-white uppercase tracking-wider mb-4"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            Quit to Title?
          </h2>
          <p className="text-white/60 mb-6">
            Any unsaved progress will be lost. Are you sure you want to quit?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-3 bg-white/10 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onQuit}
              className="flex-1 py-3 bg-red-500 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-600 transition-colors"
            >
              Quit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="text-white/40 hover:text-white/70 transition-colors text-xs uppercase tracking-wider"
    >
      Quit
    </button>
  );
}