import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { User, Settings, LogOut, Home } from 'lucide-react';

interface ChatUserIndicatorProps {
  userName: string;
  onSettings: () => void;
  onLogout: () => void;
  onHome: () => void;
}

export function ChatUserIndicator({ userName, onSettings, onLogout, onHome }: ChatUserIndicatorProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {/* Home button */}
      <motion.button
        onClick={onHome}
        className="p-2 rounded-lg glass-panel border-[#2A3038] hover:border-[#4BB7FF]/50 transition-colors group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Ana Sayfaya Dön"
      >
        <Home className="w-4 h-4 text-[#9FA8B3] group-hover:text-[#4BB7FF] transition-colors" />
      </motion.button>

      {/* User indicator with dropdown */}
      <div className="relative">
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel border-[#2A3038] hover:border-[#4BB7FF]/50 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/60 flex items-center justify-center">
              <User className="w-3 h-3 text-[#0C0E11]" />
            </div>
            {/* Online glow dot */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#44D07B] border border-[#0C0E11]"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(68, 208, 123, 0)',
                  '0 0 8px rgba(68, 208, 123, 0.6)',
                  '0 0 0px rgba(68, 208, 123, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <span className="text-sm text-[#4BB7FF]">{userName}</span>
        </motion.button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {showMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              />
              
              <motion.div
                className="absolute right-0 top-full mt-2 w-40 rounded-xl glass-panel border-[#2A3038] overflow-hidden z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 space-y-1">
                  <motion.button
                    onClick={() => {
                      onSettings();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#E6E8EB] hover:bg-[#4BB7FF]/10 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <Settings className="w-4 h-4 text-[#4BB7FF]" />
                    Ayarlar
                  </motion.button>
                  
                  <div className="h-px bg-[#2A3038] my-1" />
                  
                  <motion.button
                    onClick={() => {
                      onLogout();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#D24A50] hover:bg-[#D24A50]/10 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <LogOut className="w-4 h-4" />
                    Çıkış
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
