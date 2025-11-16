import { motion } from 'motion/react';
import { TrendingUp, Battery, Activity } from 'lucide-react';

interface InsightCard {
  id: string;
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

const insightCards: InsightCard[] = [
  {
    id: 'efficiency',
    label: 'Enerji verimliliği',
    value: 87,
    icon: Battery,
    color: '#44D07B',
  },
  {
    id: 'frequency',
    label: 'Kullanım sıklığı',
    value: 92,
    icon: Activity,
    color: '#4BB7FF',
  },
  {
    id: 'dynamics',
    label: 'Sürüş dinamiği',
    value: 85,
    icon: TrendingUp,
    color: '#E6E8EB',
  },
];

export function ProfilePanel() {
  return (
    <motion.div
      className="space-y-10 px-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header Section */}
      <div className="relative">
        <motion.div
          className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4BB7FF] to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <h3 className="text-[#E6E8EB] text-lg mb-4">Veri Analiz Özeti</h3>
        <div className="space-y-2 text-sm text-[#9FA8B3] leading-relaxed">
          <p>Kullanım tarzınız: şehir içi, verim odaklı.</p>
          <p>Bütçe dengesi: orta-yüksek segment.</p>
          <p>Sürüş alışkanlığı: dengeli / teknik.</p>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-[#2A3038]/20" />

      {/* Insight Cards Section */}
      <div className="space-y-4">
        {insightCards.map((card, index) => {
          const Icon = card.icon;
          
          return (
            <motion.div
              key={card.id}
              className="relative group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
            >
              {/* Card container */}
              <div className="relative rounded-lg glass-panel border-[#2A3038] p-4 overflow-hidden">
                {/* Blueprint overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'linear-gradient(#4BB7FF 1px, transparent 1px), linear-gradient(90deg, #4BB7FF 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${card.color}15, transparent 70%)`,
                  }}
                />

                <div className="relative flex items-center justify-between">
                  {/* Left: Icon + Label */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${card.color}15`,
                        border: `1px solid ${card.color}30`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: card.color }} />
                    </div>
                    <span className="text-sm text-[#E6E8EB]">{card.label}</span>
                  </div>

                  {/* Right: Mini gauge */}
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke="rgba(42,48,56,0.5)"
                        strokeWidth="3"
                        fill="none"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke={card.color}
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 113" }}
                        animate={{ 
                          strokeDasharray: `${(card.value / 100) * 113} 113` 
                        }}
                        transition={{ 
                          duration: 1.2, 
                          delay: 0.3 + index * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-[#E6E8EB]">{card.value}</span>
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${card.color}40, transparent 70%)`,
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Data Completeness Gauge */}
      <motion.div
        className="relative rounded-xl glass-panel border-[#2A3038] p-5 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Blueprint overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#4BB7FF 1px, transparent 1px), linear-gradient(90deg, #4BB7FF 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Accent glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(75, 183, 255, 0.08), transparent 70%)',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#9FA8B3]">Veri tamlığı</span>
            <span className="text-2xl text-[#E6E8EB]">87%</span>
          </div>

          {/* Progress bar */}
          <div className="relative h-2 rounded-full bg-[#15181D] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #4BB7FF 0%, #44D07B 100%)',
              }}
              initial={{ width: 0 }}
              animate={{ width: '87%' }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />

            {/* Glow effect on bar */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #4BB7FF 0%, #44D07B 100%)',
                filter: 'blur(6px)',
              }}
              initial={{ width: 0, opacity: 0.6 }}
              animate={{ width: '87%', opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}