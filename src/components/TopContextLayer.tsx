import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function TopContextLayer() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <motion.div 
      className="relative px-6 py-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative">
          {/* Conscious glow pulse - Electric Azure Flow */}
          <motion.div
            className="absolute inset-0 bg-[#4BB7FF]/30 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Logo icon - sacred geometry */}
          <svg width="40" height="40" viewBox="0 0 40 40" className="relative z-10">
            <motion.path
              d="M20 5 L35 15 L35 25 L20 35 L5 25 L5 15 Z"
              stroke="url(#logo-gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="20"
              cy="20"
              r="4"
              fill="url(#logo-gradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            {/* Inner consciousness lines */}
            <motion.line
              x1="20" y1="15" x2="20" y2="10"
              stroke="url(#logo-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
            />
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4BB7FF" />
                <stop offset="100%" stopColor="#E6E8EB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div>
          <h1 className="text-[#E6E8EB] tracking-[-0.01em]">CARIUSB</h1>
          <p className="text-xs text-[#9FA8B3] tracking-[0.02em] uppercase">Cognitive Engineering AI</p>
        </div>
      </motion.div>

      {/* Theme toggle */}
      <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative p-2 rounded-lg glass-panel metal-reflection hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-[#4BB7FF]" />
        ) : (
          <Sun className="w-5 h-5 text-[#4BB7FF]" />
        )}
        
        {/* Breathing animation ring - bilinç nabzı */}
        <motion.div
          className="absolute inset-0 border border-[#4BB7FF]/50 rounded-lg"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </motion.div>
  );
}