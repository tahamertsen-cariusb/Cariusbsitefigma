import { motion } from 'motion/react';

export function IdleParticles() {
  // 5-7 vector dots with low opacity for idle background motion
  const particleCount = 6;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(particleCount)].map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = 20 + Math.random() * 15;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              background: 'radial-gradient(circle, rgba(75, 183, 255, 0.12) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}
