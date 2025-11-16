import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

interface Parameter {
  id: string;
  label: string;
  value: number;
  color: string;
}

const parameters: Parameter[] = [
  { id: 'performance', label: 'Performans', value: 92, color: '#4BB7FF' },
  { id: 'comfort', label: 'Konfor', value: 89, color: '#44D07B' },
  { id: 'value', label: 'Fiyat–Değer', value: 94, color: '#E6E8EB' },
  { id: 'sustainability', label: 'Sürdürülebilirlik', value: 85, color: '#9FA8B3' },
];

export function CompatibilityPanel() {
  const overallScore = 93;

  return (
    <motion.div
      className="space-y-10 px-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="relative">
        <motion.div
          className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4BB7FF] to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <h3 className="text-[#E6E8EB] text-lg">Uygunluk Analizi</h3>
      </div>

      {/* Overall Compatibility Score - Circular Gauge */}
      <motion.div
        className="relative rounded-xl glass-panel border-[#2A3038] p-8 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {/* Cinematic glow background - contained */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(75, 183, 255, 0.15), transparent 70%)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Technical line overlays */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4BB7FF]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4BB7FF]/30 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-[#4BB7FF]/30 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[#4BB7FF]/30 to-transparent" />

        <div className="relative flex flex-col items-center">
          <span className="text-xs text-[#9FA8B3] mb-6 tracking-wider uppercase">Genel Uyum Skoru</span>
          
          {/* Large circular gauge - centered with breathing space */}
          <div className="relative w-32 h-32 my-4">
            <svg className="w-32 h-32 -rotate-90">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(42,48,56,0.5)"
                strokeWidth="6"
                fill="none"
              />
              {/* Progress circle with gradient */}
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gaugeGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 352" }}
                animate={{ 
                  strokeDasharray: `${(overallScore / 100) * 352} 352` 
                }}
                transition={{ 
                  duration: 2, 
                  delay: 0.3,
                  ease: "easeOut"
                }}
              />
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4BB7FF" />
                  <stop offset="50%" stopColor="#44D07B" />
                  <stop offset="100%" stopColor="#E6E8EB" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center score display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-4xl text-[#E6E8EB]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {overallScore}
              </motion.span>
              <span className="text-xs text-[#9FA8B3]">%</span>
            </div>

            {/* Accent glow - contained within gauge area */}
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(75, 183, 255, 0.3), transparent 70%)',
                filter: 'blur(16px)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Separator */}
      <div className="h-px bg-[#2A3038]/20" />

      {/* Parameters List */}
      <div className="space-y-4">
        {parameters.map((param, index) => (
          <motion.div
            key={param.id}
            className="relative rounded-lg glass-panel border-[#2A3038] p-4 overflow-hidden group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
          >
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at 0% 50%, ${param.color}15, transparent 70%)`,
              }}
            />

            {/* Left accent bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
              style={{ background: param.color }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
            />

            <div className="relative flex items-center justify-between">
              {/* Label */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: param.color }} />
                <span className="text-sm text-[#E6E8EB]">{param.label}</span>
              </div>

              {/* Value + mini bar */}
              <div className="flex items-center gap-3">
                {/* Mini progress bar */}
                <div className="w-20 h-1.5 rounded-full bg-[#15181D] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: param.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${param.value}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.4 + index * 0.08,
                      ease: "easeOut"
                    }}
                  />
                </div>

                {/* Numeric value */}
                <span className="text-sm text-[#E6E8EB] w-8 text-right">{param.value}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        className="relative rounded-lg glass-panel border-[#2A3038]/50 p-4 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Subtle glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(75, 183, 255, 0.05), transparent)',
          }}
        />

        <p className="relative text-xs text-[#9FA8B3] text-center">
          Bu skorlar, profil verilerinize göre optimize edilmiştir.
        </p>
      </motion.div>
    </motion.div>
  );
}