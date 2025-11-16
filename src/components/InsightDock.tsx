import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { TrendingUp, Zap, Brain, ChevronRight, User, Target } from 'lucide-react';
import { ProfilePanel } from './ProfilePanel';
import { CompatibilityPanel } from './CompatibilityPanel';

type TabType = 'insights' | 'profile' | 'compatibility';

const insights = [
  {
    id: 1,
    title: 'Stratejik Öneri',
    description: 'Veri akışınız optimize edilebilir',
    score: 87,
    icon: TrendingUp,
    color: 'from-[#4BB7FF] to-[#4BB7FF]/60',
    glowColor: 'rgba(75, 183, 255, 0.3)',
  },
  {
    id: 2,
    title: 'Bilişsel Analiz',
    description: 'Derin öğrenme modeli aktif',
    score: 92,
    icon: Brain,
    color: 'from-[#44D07B] to-[#44D07B]/60',
    glowColor: 'rgba(68, 208, 123, 0.3)',
  },
  {
    id: 3,
    title: 'Hızlı Eylem',
    description: 'İki aksiyon bekliyor',
    score: 78,
    icon: Zap,
    color: 'from-[#4BB7FF] to-[#E6E8EB]',
    glowColor: 'rgba(230, 232, 235, 0.2)',
  },
];

interface Tab {
  id: TabType;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'insights', label: 'Insights', icon: Brain },
  { id: 'profile', label: 'Profiliniz', icon: User },
  { id: 'compatibility', label: 'Uygunluk', icon: Target },
];

export function InsightDock() {
  const [activeTab, setActiveTab] = useState<TabType>('insights');

  return (
    <motion.div
      className="w-80 space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header with breathing dots */}
      <motion.div
        className="flex items-center justify-between px-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-[#9FA8B3] tracking-wide">Insight Dock</h2>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-[#4BB7FF]"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Tab Switcher - Glass segmented control */}
      <div className="relative rounded-xl glass-panel border-[#2A3038] p-1 backdrop-blur-xl">
        {/* Background glow */}
        <motion.div
          className="absolute -inset-1 rounded-xl"
          style={{
            background: 'radial-gradient(circle, rgba(75, 183, 255, 0.1) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 px-3 py-2 rounded-lg text-xs transition-colors ${
                  isActive ? 'text-[#E6E8EB]' : 'text-[#9FA8B3]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(75, 183, 255, 0.2) 0%, transparent 100%)',
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}

                {/* Content */}
                <div className="relative flex items-center justify-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="tracking-wider">{tab.label}</span>
                </div>

                {/* Active underline */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#4BB7FF]"
                    layoutId="activeTabUnderline"
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar px-1">
        <AnimatePresence mode="wait">
          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              className="space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                
                return (
                  <motion.div
                    key={insight.id}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Glass card */}
                    <div className="relative rounded-xl glass-panel border-[#2A3038] p-4 overflow-hidden">
                      {/* Liquid data animation background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-0 group-hover:opacity-10 liquid-flow`}
                        style={{
                          backgroundSize: '200% 200%',
                        }}
                      />
                      
                      <div className="relative flex items-start gap-3">
                        {/* Icon with glow */}
                        <div className="relative">
                          <motion.div
                            className={`absolute inset-0 rounded-lg blur-md`}
                            style={{
                              background: insight.glowColor,
                            }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                          <div className={`relative p-2 rounded-lg bg-gradient-to-br ${insight.color}`}>
                            <Icon className="w-4 h-4 text-[#0C0E11]" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[#E6E8EB] mb-1">{insight.title}</h3>
                          <p className="text-xs text-[#9FA8B3]">{insight.description}</p>
                        </div>
                        
                        {/* Score circle */}
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12 -rotate-90">
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="rgba(42,48,56,0.5)"
                              strokeWidth="3"
                              fill="none"
                            />
                            <motion.circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke={`url(#gradient-${insight.id})`}
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                              initial={{ strokeDasharray: "0 126" }}
                              animate={{ 
                                strokeDasharray: `${(insight.score / 100) * 126} 126` 
                              }}
                              transition={{ 
                                duration: 1.5, 
                                delay: 0.2 + index * 0.1,
                                ease: "easeOut"
                              }}
                            />
                            <defs>
                              <linearGradient id={`gradient-${insight.id}`}>
                                <stop offset="0%" stopColor="#4BB7FF" />
                                <stop offset="100%" stopColor="#E6E8EB" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-[#E6E8EB]">{insight.score}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* "Neden Bu?" link */}
                      <motion.div
                        className="mt-3 pt-3 border-t border-[#2A3038] flex items-center justify-between text-xs text-[#9FA8B3] group-hover:text-[#4BB7FF] transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <span className="tracking-[0.02em]">Neden Bu?</span>
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfilePanel />
            </motion.div>
          )}

          {activeTab === 'compatibility' && (
            <motion.div
              key="compatibility"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CompatibilityPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}