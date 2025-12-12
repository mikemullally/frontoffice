import React, { useState, useEffect } from 'react';

const sports = [
  {
    name: 'basketball',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80',
    accent: '#f97316'
  },
  {
    name: 'soccer',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80',
    accent: '#22c55e'
  },
  {
    name: 'cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1920&q=80',
    accent: '#06b6d4'
  }
];

export default function IntroScreen({ onNewCareer, onContinue }) {
  const [currentSport, setCurrentSport] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      
      setTimeout(() => {
        setCurrentSport((prev) => (prev + 1) % sports.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sport = sports[currentSport];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${sport.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div 
            className="text-3xl font-serif italic text-white tracking-wide"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            front office.
          </div>
          <div className="flex gap-2">
            {sports.map((s, index) => (
              <div
                key={s.name}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSport ? 'bg-white w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 
            className={`text-6xl md:text-7xl font-serif text-white mb-4 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Build Your Legacy
          </h1>
          <p className={`text-xl text-white/70 mb-12 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            Manage teams. Run leagues. Become a legend.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onNewCareer}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg"
            >
              New Career
            </button>
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/60 hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-white/50 text-sm">
          <span>© 2024 Front Office</span>
          <span className="capitalize">{sport.name}</span>
        </div>

      </div>
    </div>
  );
}