import React from 'react';

const SoundWaveBackground = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
      <div className="flex gap-[2px]">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="w-[2px] bg-indigo-400 rounded-sm animate-wave"
            style={{
              animationDelay: `${i * 0.05}s`,
              animationDuration: '1s',
              animationIterationCount: 'infinite',
              height: `${Math.random() * 60 + 20}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SoundWaveBackground;
