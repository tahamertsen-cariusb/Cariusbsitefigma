import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onAuth: (name: string) => void;
}

export function AuthModal({ isOpen, mode, onClose, onAuth }: AuthModalProps) {
  const [authMode, setAuthMode] = useState(mode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = authMode === 'signup' ? name : email.split('@')[0];
    onAuth(userName);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-[#0C0E11]/90 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-6">
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Glass card */}
              <div className="relative rounded-2xl glass-panel border-[#2A3038] p-8 overflow-hidden">
                {/* Blueprint overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(75,183,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(75,183,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
                
                {/* Glow accent */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#4BB7FF]/10 via-transparent to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg glass-panel border-[#2A3038] hover:border-[#4BB7FF]/50 transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-[#9FA8B3]" />
                </motion.button>

                {/* Content */}
                <div className="relative">
                  {/* Title */}
                  <div className="mb-8">
                    <h2 className="text-2xl text-[#E6E8EB] mb-2 tracking-[-0.01em]">
                      {authMode === 'login' ? 'Giriş Yap' : 'Üye Ol'}
                    </h2>
                    <p className="text-sm text-[#9FA8B3]">
                      {authMode === 'login' 
                        ? 'Hesabınıza erişim için bilgilerinizi girin.'
                        : 'Akıllı karar sistemine katılın.'}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {authMode === 'signup' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-sm text-[#9FA8B3] mb-2 tracking-[0.02em]">
                          Ad Soyad
                        </label>
                        <div className="relative rounded-xl glass-panel border-[#2A3038] focus-within:border-[#4BB7FF]/50 transition-colors">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2">
                            <User className="w-4 h-4 text-[#4BB7FF]" />
                          </div>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Selin Aydın"
                            className="w-full bg-transparent text-[#E6E8EB] pl-12 pr-4 py-3 outline-none"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-sm text-[#9FA8B3] mb-2 tracking-[0.02em]">
                        E-posta
                      </label>
                      <div className="relative rounded-xl glass-panel border-[#2A3038] focus-within:border-[#4BB7FF]/50 transition-colors">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Mail className="w-4 h-4 text-[#4BB7FF]" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="selin@example.com"
                          className="w-full bg-transparent text-[#E6E8EB] pl-12 pr-4 py-3 outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#9FA8B3] mb-2 tracking-[0.02em]">
                        Şifre
                      </label>
                      <div className="relative rounded-xl glass-panel border-[#2A3038] focus-within:border-[#4BB7FF]/50 transition-colors">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Lock className="w-4 h-4 text-[#4BB7FF]" />
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-transparent text-[#E6E8EB] pl-12 pr-4 py-3 outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      className="relative w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/80 text-[#0C0E11] tracking-[0.02em] metal-reflection overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                      
                      <span className="relative flex items-center justify-center gap-2">
                        {authMode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </motion.button>
                  </form>

                  {/* Switch mode */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-[#9FA8B3]">
                      {authMode === 'login' ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
                      {' '}
                      <motion.button
                        onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                        className="text-[#4BB7FF] hover:text-[#E6E8EB] transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {authMode === 'login' ? 'Üye Ol' : 'Giriş Yap'}
                      </motion.button>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#2A3038]" />
                    <span className="text-xs text-[#9FA8B3]">veya</span>
                    <div className="flex-1 h-px bg-[#2A3038]" />
                  </div>

                  {/* Demo login */}
                  <motion.button
                    onClick={() => {
                      onAuth('Selin A.');
                      onClose();
                    }}
                    className="w-full px-6 py-3 rounded-xl glass-panel border-[#2A3038] hover:border-[#4BB7FF]/50 text-sm text-[#E6E8EB] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Demo ile Devam Et
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
