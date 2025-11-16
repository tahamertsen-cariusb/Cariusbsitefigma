import { motion } from 'motion/react';
import { useState } from 'react';
import { Power, Zap, Sparkles } from 'lucide-react';

type DeepSearchMode = 'auto' | 'off' | 'on';

interface DeepSearchToggleProps {
  size?: 'default' | 'small';
  onChange?: (mode: DeepSearchMode) => void;
}

export function DeepSearchToggle({ size = 'default', onChange }: DeepSearchToggleProps) {
  const [activeMode, setActiveMode] = useState<DeepSearchMode>('auto');
  const [hoveredMode, setHoveredMode] = useState<DeepSearchMode | null>(null);

  const isSmall = size === 'small';
  const height = isSmall ? 'h-8' : 'h-10';
  const minWidth = isSmall ? 'min-w-14' : 'min-w-20';
  const textSize = isSmall ? 'text-xs' : 'text-sm';
  const iconSize = isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5';

  const modes: Array<{
    id: DeepSearchMode;
    label: string;
    tooltip: string;
    icon: React.ElementType;
  }> = [
    {
      id: 'auto',
      label: 'Auto',
      tooltip: 'Derin arama modu: Otomatik',
      icon: Sparkles,
    },
    {
      id: 'off',
      label: 'Off',
      tooltip: 'Derin arama kapalı',
      icon: Power,
    },
    {
      id: 'on',
      label: 'On',
      tooltip: 'Derin arama açık',
      icon: Zap,
    },
  ];

  const handleModeChange = (mode: DeepSearchMode) => {
    setActiveMode(mode);
    onChange?.(mode);
  };

  return (
    <div className="relative">
      {/* Tooltip */}
      {hoveredMode && (
        <motion.div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg glass-panel border-[#2A3038] backdrop-blur-xl whitespace-nowrap z-50"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs text-[#E6E8EB]">
            {modes.find(m => m.id === hoveredMode)?.tooltip}
          </span>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45 bg-[#15181D] border-r border-b border-[#2A3038]" />
        </motion.div>
      )}

      {/* Main control */}
      <motion.div
        className={`relative ${height} flex items-center gap-0.5 rounded-xl p-1 glass-panel border-[#2A3038] backdrop-blur-xl`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute -inset-1 rounded-xl"
          style={{
            background: 'radial-gradient(circle, rgba(75, 183, 255, 0.12) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: activeMode === 'off' ? 0.1 : (activeMode === 'on' ? 0.4 : 0.25),
          }}
          transition={{
            duration: 0.3,
          }}
        />

        {modes.map((mode, index) => {
          const isActive = activeMode === mode.id;
          const isHovered = hoveredMode === mode.id;
          const Icon = mode.icon;

          return (
            <motion.button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              onMouseEnter={() => setHoveredMode(mode.id)}
              onMouseLeave={() => setHoveredMode(null)}
              className={`relative ${minWidth} ${height} px-3 flex items-center justify-center gap-1.5 rounded-lg transition-colors ${
                isActive ? 'text-[#E6E8EB]' : 'text-[#9FA8B3]'
              }`}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(75, 183, 255, 0.15) 0%, transparent 100%)',
                  }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                />
              )}

              {/* Hover effect */}
              {isHovered && !isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-[#2A3038]/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Icon */}
              <Icon className={`${iconSize} relative z-10`} />

              {/* Label */}
              <span className={`${textSize} relative z-10 tracking-[0.02em]`}>
                {mode.label}
              </span>

              {/* Auto mode: breathing badge dot */}
              {isActive && mode.id === 'auto' && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#4BB7FF]"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* On mode: signal glyph */}
              {isActive && mode.id === 'on' && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-[#44D07B]"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(68, 208, 123, 0)',
                      '0 0 6px rgba(68, 208, 123, 0.8)',
                      '0 0 0px rgba(68, 208, 123, 0)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Divider line (not on last) */}
              {index < modes.length - 1 && !isActive && modes[index + 1].id !== activeMode && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-[#2A3038]" />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Label below for default size */}
      {!isSmall && (
        <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <span className="text-xs text-[#9FA8B3] tracking-[0.02em]">DeepSearch</span>
        </motion.div>
      )}
    </div>
  );
}
