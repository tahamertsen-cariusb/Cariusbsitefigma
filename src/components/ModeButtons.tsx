import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Car, Bike, CircuitBoard, Zap } from 'lucide-react';
import { DeepSearchToggle } from './DeepSearchToggle';

type ModeType = 'auto' | 'moto' | 'bicycle' | 'tech';

interface Mode {
  id: ModeType;
  icon: React.ElementType;
  label: string;
  tooltip: string;
}

const modes: Mode[] = [
  {
    id: 'auto',
    icon: Car,
    label: '🚗',
    tooltip: 'Otomobil Modu',
  },
  {
    id: 'moto',
    icon: Bike,
    label: '🏍️',
    tooltip: 'Motosiklet Modu',
  },
  {
    id: 'bicycle',
    icon: Bike,
    label: '🚲',
    tooltip: 'Bisiklet Modu',
  },
  {
    id: 'tech',
    icon: CircuitBoard,
    label: '⚙️',
    tooltip: 'Teknoloji Modu',
  },
];

interface ModeButtonsProps {
  onModeChange?: (mode: ModeType) => void;
}

export function ModeButtons({ onModeChange }: ModeButtonsProps) {
  const [activeMode, setActiveMode] = useState<ModeType>('auto');
  const [hoveredMode, setHoveredMode] = useState<ModeType | null>(null);

  const handleModeClick = (modeId: ModeType) => {
    setActiveMode(modeId);
    onModeChange?.(modeId);
  };

  return (
    <>
      {/* Current mode indicator - top overlay */}
      <motion.div
        className="fixed top-24 right-6 z-40 px-4 py-2 rounded-lg glass-panel border-[#2A3038] backdrop-blur-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9FA8B3] tracking-[0.02em]">Aktif Mod:</span>
          <span className="text-sm text-[#4BB7FF]">
            {modes.find(m => m.id === activeMode)?.label} {modes.find(m => m.id === activeMode)?.tooltip.split(' ')[0]}
          </span>
        </div>
      </motion.div>

      {/* Mode buttons panel */}
      <div className="fixed top-1/2 -translate-y-1/2 right-6 z-40 flex flex-col items-center gap-8">
        {modes.map((mode, index) => {
          const isActive = activeMode === mode.id;
          const isHovered = hoveredMode === mode.id;
          const Icon = mode.icon;

          return (
            <div key={mode.id} className="relative">
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg glass-panel border-[#2A3038] backdrop-blur-xl whitespace-nowrap"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm text-[#E6E8EB] tracking-[0.02em]">{mode.tooltip}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button */}
              <motion.button
                onClick={() => handleModeClick(mode.id)}
                onMouseEnter={() => setHoveredMode(mode.id)}
                onMouseLeave={() => setHoveredMode(null)}
                className="relative w-14 h-14 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isActive ? 1 : (hoveredMode && !isActive ? 0.6 : 0.8),
                  x: 0,
                  scale: isHovered ? 1.05 : 1,
                  y: isHovered ? -4 : 0,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1 + 0.2,
                  scale: { duration: 0.2 },
                  y: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                {/* Background glass layer */}
                <div className="absolute inset-0 bg-[#15181D]/70 backdrop-blur-md" />
                
                {/* Border */}
                <div className="absolute inset-0 border border-[#2A3038] rounded-2xl" />

                {/* Outer accent glow ring - subtle idle */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(75, 183, 255, 0.15) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: isActive ? [0.6, 1, 0.6] : (isHovered ? [0.3, 0.5, 0.3] : 0.2),
                  }}
                  transition={{
                    duration: isActive ? 2 : (isHovered ? 1 : 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Active state - inner fill */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(75, 183, 255, 0.2) 0%, transparent 70%)',
                      }}
                    />
                  </motion.div>
                )}

                {/* Hover breathing glow */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{
                      borderColor: '#4BB7FF',
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      borderColor: ['rgba(75, 183, 255, 0.5)', 'rgba(230, 232, 235, 0.8)', 'rgba(75, 183, 255, 0.5)'],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Click flash pulse */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white rounded-2xl"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {mode.id === 'auto' && (
                    <motion.div
                      animate={{
                        color: isActive ? '#4BB7FF' : '#E6E8EB',
                      }}
                    >
                      <Car className="w-6 h-6" />
                    </motion.div>
                  )}
                  {mode.id === 'moto' && (
                    <motion.div
                      animate={{
                        color: isActive ? '#4BB7FF' : '#E6E8EB',
                      }}
                    >
                      <Zap className="w-6 h-6" />
                    </motion.div>
                  )}
                  {mode.id === 'bicycle' && (
                    <motion.div
                      animate={{
                        color: isActive ? '#4BB7FF' : '#E6E8EB',
                      }}
                    >
                      <Bike className="w-6 h-6" />
                    </motion.div>
                  )}
                  {mode.id === 'tech' && (
                    <motion.div
                      animate={{
                        color: isActive ? '#4BB7FF' : '#E6E8EB',
                      }}
                    >
                      <CircuitBoard className="w-6 h-6" />
                    </motion.div>
                  )}
                </div>

                {/* Active indicator - small dot */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#4BB7FF]"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      boxShadow: [
                        '0 0 0px rgba(75, 183, 255, 0)',
                        '0 0 8px rgba(75, 183, 255, 0.8)',
                        '0 0 0px rgba(75, 183, 255, 0)',
                      ],
                    }}
                    transition={{
                      scale: { duration: 0.2 },
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}
        
        {/* DeepSearch Toggle - below mode buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <DeepSearchToggle size="default" />
        </motion.div>
      </div>
    </>
  );
}