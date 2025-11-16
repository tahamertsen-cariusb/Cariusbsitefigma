import { motion } from 'motion/react';
import { Check, Zap, Crown, Building2 } from 'lucide-react';
import { Navbar } from './Navbar';

interface PricingPageProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  onSettings: () => void;
  onSelectPlan: (plan: string) => void;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  highlighted?: boolean;
  accentColor?: string;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₺199',
    icon: Zap,
    description: 'Bireysel kullanım için ideal başlangıç',
    features: [
      'Temel AI analiz',
      '10 sorgu / ay',
      'Standart destek',
      'Email bildirimleri',
      'Temel raporlar',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₺499',
    icon: Crown,
    description: 'Profesyoneller için gelişmiş özellikler',
    features: [
      'Gelişmiş AI analiz',
      'Sınırsız sorgu',
      'Öncelikli destek',
      'DeepSearch modu',
      'Detaylı raporlar',
      'API erişimi',
    ],
    highlighted: true,
    accentColor: '#4BB7FF',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Özel Fiyat',
    icon: Building2,
    description: 'Kurumsal çözümler ve tam destek',
    features: [
      'Özel AI modeli',
      'Sınırsız kullanım',
      '7/24 destek',
      'Özel entegrasyonlar',
      'Çoklu kullanıcı',
      'SLA garantisi',
      'Eğitim + Danışmanlık',
    ],
    accentColor: '#D4A574',
  },
];

export function PricingPage({
  isLoggedIn,
  userName,
  onLogin,
  onSignup,
  onLogout,
  onSettings,
  onSelectPlan,
}: PricingPageProps) {
  return (
    <div className="relative min-h-screen bg-[#0C0E11] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0E11] via-[#15181D] to-[#0C0E11]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(75,183,255,0.08),transparent_60%)]" />
      
      {/* Particle field */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
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
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        onSettings={onSettings}
      />

      {/* Main Content */}
      <div className="relative z-10 px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl mb-4 bg-gradient-to-r from-[#4BB7FF] via-[#E6E8EB] to-[#4BB7FF] bg-clip-text text-transparent tracking-[-0.02em]"
              style={{
                backgroundSize: '200% auto',
              }}
              animate={{
                backgroundPosition: ['0% center', '200% center', '0% center'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Veri + Sezgi = Doğru Seçim
            </motion.h1>
            <motion.p
              className="text-xl text-[#9FA8B3] max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              İhtiyacınıza göre planı seçin
            </motion.p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isHighlighted = plan.highlighted;

              return (
                <motion.div
                  key={plan.id}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Card */}
                  <div
                    className={`relative h-full rounded-3xl glass-panel backdrop-blur-2xl p-8 overflow-hidden ${
                      isHighlighted ? 'border-[#4BB7FF]/30' : 'border-[#2A3038]'
                    }`}
                    style={{
                      transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {/* Background glow */}
                    <motion.div
                      className="absolute -inset-1 rounded-3xl"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${
                          plan.accentColor || 'rgba(75, 183, 255, 0.08)'
                        }20, transparent 70%)`,
                        filter: 'blur(24px)',
                      }}
                      animate={{
                        opacity: isHighlighted ? [0.5, 0.8, 0.5] : [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Card content */}
                    <div className="relative">
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                        style={{
                          background: `radial-gradient(circle, ${
                            plan.accentColor || '#4BB7FF'
                          }30 0%, transparent 70%)`,
                        }}
                      >
                        <Icon
                          className="w-7 h-7"
                          style={{ color: plan.accentColor || '#4BB7FF' }}
                        />
                      </div>

                      {/* Plan name */}
                      <h3 className="text-2xl text-[#E6E8EB] mb-2">{plan.name}</h3>

                      {/* Description */}
                      <p className="text-sm text-[#9FA8B3] mb-6">{plan.description}</p>

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl text-[#E6E8EB]">{plan.price}</span>
                          {plan.id !== 'enterprise' && (
                            <span className="text-sm text-[#9FA8B3]">/ ay</span>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: `${plan.accentColor || '#4BB7FF'}30`,
                              }}
                            >
                              <Check
                                className="w-3 h-3"
                                style={{ color: plan.accentColor || '#4BB7FF' }}
                              />
                            </div>
                            <span className="text-sm text-[#E6E8EB]">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <motion.button
                        onClick={() => onSelectPlan(plan.id)}
                        className="relative w-full py-3 rounded-xl overflow-hidden group"
                        style={{
                          background: isHighlighted
                            ? `linear-gradient(135deg, ${plan.accentColor || '#4BB7FF'}, ${
                                plan.accentColor || '#4BB7FF'
                              }CC)`
                            : 'rgba(42, 48, 56, 0.6)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Breathing ring for highlighted */}
                        {isHighlighted && (
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
                        )}

                        <span
                          className={`relative tracking-[0.02em] ${
                            isHighlighted ? 'text-[#0C0E11]' : 'text-[#E6E8EB]'
                          }`}
                        >
                          Planı Seç
                        </span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Outer glow */}
                  {isHighlighted && (
                    <motion.div
                      className="absolute -inset-4 rounded-3xl -z-10"
                      style={{
                        background: `radial-gradient(circle, ${plan.accentColor}15 0%, transparent 70%)`,
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
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Footer note */}
          <motion.div
            className="text-center mt-16 pt-8 border-t border-[#2A3038]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-[#9FA8B3] tracking-[0.02em]">
              Fiyatlar örnek amaçlıdır (demo)
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
