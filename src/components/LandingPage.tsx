import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';

interface LandingPageProps {
  isLoggedIn: boolean;
  userName?: string;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onSettings: () => void;
  onPricing?: () => void;
  onHome?: () => void;
}

export function LandingPage({ 
  isLoggedIn, 
  userName, 
  onClose, 
  onLogin, 
  onSignup, 
  onLogout,
  onSettings,
  onPricing,
  onHome
}: LandingPageProps) {
  const [inputValue, setInputValue] = useState('');
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    // Show AI preview bubbles after delay
    const timer = setTimeout(() => setShowBubbles(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Transition to chat on typing
    if (inputValue.length > 0) {
      const transitionTimer = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(transitionTimer);
    }
  }, [inputValue, onClose]);

  return (
    <div className="relative min-h-screen bg-[#0C0E11] overflow-hidden flex flex-col">
      {/* Background effects - Physical Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0E11] via-[#15181D] to-[#0C0E11]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(75,183,255,0.08),transparent_60%)]" />
      
      {/* Particle field - light particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#4BB7FF]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid overlay - teknik yapı */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(42,48,56,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(42,48,56,0.15)_1px,transparent_1px)] bg-[size:80px_80px] opacity-50" />

      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        onSettings={onSettings}
        onPricing={onPricing}
        onHome={onHome}
      />

      {/* Hero Section - Centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full mx-auto">
          {/* Glass panel reflection behind text */}
          <motion.div
            className="absolute inset-0 max-w-3xl mx-auto h-96 rounded-3xl glass-panel border-[#2A3038]/30 -z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Main Headline */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-6xl mb-6 bg-gradient-to-r from-[#4BB7FF] via-[#E6E8EB] to-[#4BB7FF] bg-clip-text text-transparent tracking-[-0.02em]"
              style={{
                backgroundSize: '200% auto',
              }}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ 
                opacity: 1, 
                filter: 'blur(0px)',
                backgroundPosition: ['0% center', '200% center', '0% center'],
              }}
              transition={{
                opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                filter: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                backgroundPosition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              Doğru seçimi zekâ ile yap.
            </motion.h1>
            
            <motion.div
              className="text-xl text-[#9FA8B3] max-w-2xl mx-auto space-y-2"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <p className="text-[#E6E8EB]">CARIUSB — kişisel seçim mühendisi.</p>
              <p>Veri, sezgi ve mühendislik dengesinde akıllı karar rehberi.</p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-6 text-sm text-[#9FA8B3] tracking-[0.02em]"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              Mühendislik zekâsı, sezgisel rehberlik ve güvenli hız.
            </motion.p>
            
            {/* Glow pulse behind hero text */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(75, 183, 255, 0.1) 0%, transparent 70%)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* AI Message Preview Bubbles */}
          {showBubbles && (
            <motion.div
              className="mb-8 space-y-3 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative max-w-[80%] rounded-2xl px-6 py-4 glass-panel border-[#4BB7FF]/30 backdrop-blur-xl">
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-[#4BB7FF]/20 via-[#4BB7FF]/30 to-[#4BB7FF]/20 rounded-2xl blur-sm -z-10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <p className="relative text-[#E6E8EB]">Profilinizi analiz ediyorum…</p>
                </div>
              </motion.div>

              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative max-w-[80%] rounded-2xl px-6 py-4 glass-panel border-[#4BB7FF]/30 backdrop-blur-xl">
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-[#4BB7FF]/20 via-[#4BB7FF]/30 to-[#4BB7FF]/20 rounded-2xl blur-sm -z-10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <p className="relative text-[#E6E8EB]">
                    Sürüş tarzınıza göre en uygun model: <span className="text-[#4BB7FF]">Vector A</span> (%93 uyum)
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Glowing Input Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="relative rounded-2xl glass-panel border-[#2A3038] p-4">
              {/* Breathing pulse glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-[#4BB7FF]/50"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ne aradığınızı yazın…"
                className="w-full bg-transparent text-[#E6E8EB] placeholder:text-[#9FA8B3] outline-none"
                autoFocus
              />
            </div>
          </motion.div>

          {/* Start CTA */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {isLoggedIn ? (
              <>
                <p className="text-[#E6E8EB] mb-4">
                  Hoş geldin, <span className="text-[#4BB7FF]">{userName}</span>. Sohbete devam etmek ister misin?
                </p>
                <motion.button
                  onClick={onClose}
                  className="relative px-8 py-3 rounded-xl bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/80 text-[#0C0E11] tracking-[0.02em] metal-reflection overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Breathing ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#E6E8EB] rounded-xl"
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <span className="relative flex items-center gap-2">
                    Devam Et
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={onClose}
                className="relative px-8 py-3 rounded-xl bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/80 text-[#0C0E11] tracking-[0.02em] metal-reflection overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Breathing ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#E6E8EB] rounded-xl"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <span className="relative flex items-center gap-2">
                  Başla
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 px-6 py-6 border-t border-[#2A3038]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs text-[#9FA8B3] tracking-[0.02em]">
            © 2025 CARIUSB AI — Mystic Engineering
          </p>
          
          <div className="flex items-center gap-4">
            <button className="text-xs text-[#9FA8B3] hover:text-[#E6E8EB] transition-colors">
              Gizlilik
            </button>
            <span className="text-[#2A3038]">•</span>
            <button className="text-xs text-[#9FA8B3] hover:text-[#E6E8EB] transition-colors">
              Koşullar
            </button>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}