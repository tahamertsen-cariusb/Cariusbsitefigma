import { motion } from 'motion/react';
import { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';

interface SignupPageProps {
  onSignup: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
  onPricing?: () => void;
  onHome?: () => void;
}

export function SignupPage({ onSignup, onSwitchToLogin, onPricing, onHome }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0C0E11] overflow-hidden flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0E11] via-[#15181D] to-[#0C0E11]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(75,183,255,0.08),transparent_60%)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#4BB7FF]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(42,48,56,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(42,48,56,0.12)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />

      {/* Navbar */}
      <Navbar
        isLoggedIn={false}
        onLogin={onSwitchToLogin}
        onSignup={() => {}}
        onLogout={() => {}}
        onSettings={() => {}}
        onPricing={onPricing}
        onHome={onHome}
      />

      {/* Main Content - Centered Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Glass card */}
          <div className="relative rounded-3xl glass-panel border-[#4BB7FF]/20 p-10 backdrop-blur-2xl overflow-hidden">
            {/* Accent glow */}
            <motion.div
              className="absolute -inset-1 rounded-3xl"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(75, 183, 255, 0.12) 0%, transparent 70%)',
                filter: 'blur(24px)',
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Card content */}
            <div className="relative">
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl text-[#E6E8EB] mb-2">
                  CARIUSB Üyeliği Oluştur
                </h1>
                <p className="text-sm text-[#9FA8B3] tracking-[0.02em]">
                  Kişisel seçim mühendisine hoş geldin
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm text-[#9FA8B3] mb-2 tracking-[0.02em]">
                    Ad Soyad
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-[#9FA8B3]" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-[#15181D]/60 border border-[#2A3038] rounded-xl px-12 py-3 text-[#E6E8EB] placeholder:text-[#9FA8B3]/50 outline-none transition-all duration-300"
                      placeholder="İsminiz ve soyisminiz"
                      required
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-[#4BB7FF]/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm text-[#9FA8B3] mb-2 tracking-[0.02em]">
                    E-posta
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Mail className="w-5 h-5 text-[#9FA8B3]" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-[#15181D]/60 border border-[#2A3038] rounded-xl px-12 py-3 text-[#E6E8EB] placeholder:text-[#9FA8B3]/50 outline-none transition-all duration-300"
                      placeholder="ornek@email.com"
                      required
                    />
                    {focusedField === 'email' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-[#4BB7FF]/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm text-[#9FA8B3] mb-2 tracking-[0.02em]">
                    Şifre
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Lock className="w-5 h-5 text-[#9FA8B3]" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-[#15181D]/60 border border-[#2A3038] rounded-xl px-12 py-3 text-[#E6E8EB] placeholder:text-[#9FA8B3]/50 outline-none transition-all duration-300"
                      placeholder="Güçlü bir şifre seçin"
                      required
                    />
                    {focusedField === 'password' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-[#4BB7FF]/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="relative w-full py-4 rounded-xl bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/80 text-[#0C0E11] tracking-[0.02em] overflow-hidden group mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {/* Breathing ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#E6E8EB] rounded-xl"
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.98, 1.02, 0.98],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <span className="relative flex items-center justify-center gap-2">
                    Üye Ol
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
              </form>

              {/* Switch to Login */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-[#9FA8B3]">
                  Zaten hesabın var mı?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-[#4BB7FF] hover:text-[#E6E8EB] transition-colors"
                  >
                    Giriş Yap
                  </button>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Outer glow effect */}
          <motion.div
            className="absolute -inset-4 rounded-3xl -z-10"
            style={{
              background: 'radial-gradient(circle, rgba(75, 183, 255, 0.08) 0%, transparent 70%)',
              filter: 'blur(32px)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}