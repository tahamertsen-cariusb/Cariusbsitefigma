import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Moon, Sun, Settings, LogOut, User, Globe, ChevronDown } from 'lucide-react';
import { LanguageDropdown } from './LanguageDropdown';

interface NavbarProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onSettings: () => void;
  onPricing?: () => void;
  onHome?: () => void;
}

export function Navbar({ isLoggedIn, userName, onLogin, onSignup, onLogout, onSettings, onPricing, onHome }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        delay: 0.1
      }}
    >
      {/* Glassmorphic strip */}
      <div className="relative max-w-7xl mx-auto rounded-2xl glass-panel border-[#2A3038]/50 backdrop-blur-2xl px-6 py-3">
        {/* Subtle accent glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-[#4BB7FF]/20"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => onHome?.()}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-[#4BB7FF]/30 rounded-full blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <svg width="32" height="32" viewBox="0 0 32 32" className="relative z-10">
                <path
                  d="M16 4 L27 11 L27 21 L16 28 L5 21 L5 11 Z"
                  stroke="url(#logo-gradient-nav)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="16" cy="16" r="2" fill="url(#logo-gradient-nav)" />
                <defs>
                  <linearGradient id="logo-gradient-nav" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4BB7FF" />
                    <stop offset="100%" stopColor="#E6E8EB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <span className="text-[#E6E8EB] tracking-[-0.01em] group-hover:text-[#4BB7FF] transition-colors">
              CARIUSB
            </span>
          </motion.button>

          {/* Right side menu */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                {/* Pricing link */}
                <motion.button
                  onClick={() => onPricing?.()}
                  className="text-sm text-[#9FA8B3] hover:text-[#E6E8EB] transition-colors tracking-[0.02em] relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  Ücretlendirme
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4BB7FF] to-transparent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Giriş Yap - ghost button */}
                <motion.button
                  onClick={onLogin}
                  className="px-4 py-2 rounded-lg text-sm text-[#E6E8EB] border border-[#2A3038] hover:border-[#4BB7FF]/50 transition-colors tracking-[0.02em]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Giriş Yap
                </motion.button>

                {/* Üye Ol - accent button */}
                <motion.button
                  onClick={onSignup}
                  className="relative px-5 py-2 rounded-lg bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/80 text-[#0C0E11] text-sm tracking-[0.02em] metal-reflection overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative">Üye Ol</span>
                </motion.button>
              </>
            ) : (
              <>
                {/* Pricing link (smaller for logged in) */}
                <motion.button
                  onClick={() => onPricing?.()}
                  className="text-xs text-[#9FA8B3] hover:text-[#E6E8EB] transition-colors tracking-[0.02em]"
                  whileHover={{ scale: 1.05 }}
                >
                  Ücretlendirme
                </motion.button>

                {/* User menu dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel border-[#2A3038] hover:border-[#4BB7FF]/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/60 flex items-center justify-center">
                          <User className="w-3 h-3 text-[#0C0E11]" />
                        </div>
                        {/* Online status dot */}
                        <motion.div
                          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#44D07B] border-2 border-[#0C0E11]"
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
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#9FA8B3]" />
                  </motion.button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowUserMenu(false)}
                        />
                        
                        <motion.div
                          className="absolute right-0 top-full mt-2 w-48 rounded-xl glass-panel border-[#2A3038] overflow-hidden z-50"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-2 space-y-1">
                            <motion.button
                              onClick={() => {
                                onSettings();
                                setShowUserMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#E6E8EB] hover:bg-[#4BB7FF]/10 transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              <Settings className="w-4 h-4 text-[#4BB7FF]" />
                              Ayarlar
                            </motion.button>
                            
                            <div className="h-px bg-[#2A3038] my-1" />
                            
                            <motion.button
                              onClick={() => {
                                onLogout();
                                setShowUserMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#D24A50] hover:bg-[#D24A50]/10 transition-colors"
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
              </>
            )}

            {/* Language selector */}
            <LanguageDropdown />

            {/* Theme toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg glass-panel border-[#2A3038] hover:border-[#4BB7FF]/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-[#4BB7FF]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-[#FFB84D]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}