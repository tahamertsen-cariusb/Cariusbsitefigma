import { motion } from 'motion/react';
import { MessageSquare, Home, Clock, Settings } from 'lucide-react';

interface FloatingNavProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
  onHome?: () => void;
  onSettings?: () => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Ana Sayfa' },
  { id: 'chat', icon: MessageSquare, label: 'Sohbet' },
  { id: 'history', icon: Clock, label: 'Geçmiş' },
  { id: 'settings', icon: Settings, label: 'Ayarlar' },
];

export function FloatingNav({ activeNav, onNavChange, onHome, onSettings }: FloatingNavProps) {
  
  const handleNavClick = (id: string) => {
    if (id === 'home' && onHome) {
      onHome();
    } else if (id === 'settings' && onSettings) {
      onSettings();
    } else {
      onNavChange(id);
    }
  };

  return (
    <motion.div
      className="relative w-16 flex flex-col gap-4 py-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Glass container - Gunmetal Mist */}
      <motion.div 
        className="relative rounded-2xl glass-panel p-3 space-y-4 border-[#2A3038]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl group metal-reflection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Background glow on hover - Electric Azure */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4BB7FF]/20 to-[#4BB7FF]/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Active state */}
              {isActive && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4BB7FF]/30 to-[#4BB7FF]/20"
                    layoutId="activeNav"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                  {/* Conscious glow for active item */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 15px rgba(75, 183, 255, 0.3)',
                        '0 0 25px rgba(75, 183, 255, 0.5)',
                        '0 0 15px rgba(75, 183, 255, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
              
              {/* Neon flow line on hover - liquid refraction */}
              <motion.div
                className="absolute -right-1 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-[#4BB7FF] to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <Icon className={`w-5 h-5 relative z-10 transition-colors ${
                isActive ? 'text-[#4BB7FF]' : 'text-[#9FA8B3] group-hover:text-[#E6E8EB]'
              }`} />
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
