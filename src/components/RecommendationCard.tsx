import { motion } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  score: number;
  metrics: {
    label: string;
    value: number;
    color: string;
  }[];
  reasoning: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
  onWhyClick: (recommendation: Recommendation) => void;
}

export function RecommendationCard({ recommendation, index, onWhyClick }: RecommendationCardProps) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Glass card with liquid reveal */}
      <div className="relative rounded-xl glass-panel border-[#2A3038] p-5 overflow-hidden">
        {/* Liquid reveal background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#4BB7FF]/0 via-[#4BB7FF]/10 to-[#4BB7FF]/0 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-[#E6E8EB] mb-1 flex items-center gap-2">
                {recommendation.title}
                {recommendation.score >= 90 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#44D07B]" />
                  </motion.div>
                )}
              </h3>
              <p className="text-sm text-[#9FA8B3] leading-relaxed">{recommendation.description}</p>
            </div>
            
            {/* Score circle */}
            <div className="relative w-14 h-14 ml-3">
              <svg className="w-14 h-14 -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="rgba(42,48,56,0.5)"
                  strokeWidth="3"
                  fill="none"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#4BB7FF"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 150.8" }}
                  animate={{ 
                    strokeDasharray: `${(recommendation.score / 100) * 150.8} 150.8` 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut"
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-[#E6E8EB]">{recommendation.score}</span>
              </div>
              
              {/* Conscious glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(75, 183, 255, 0)',
                    '0 0 20px rgba(75, 183, 255, 0.4)',
                    '0 0 0px rgba(75, 183, 255, 0)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
          
          {/* Metrics - Insight Circles */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {recommendation.metrics.map((metric, mIndex) => (
              <motion.div
                key={mIndex}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 + mIndex * 0.05 }}
              >
                <div className="text-center">
                  {/* Metric circle */}
                  <div className="relative inline-flex items-center justify-center w-12 h-12 mb-1">
                    <svg className="w-12 h-12 -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="rgba(42,48,56,0.5)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke={metric.color}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 126" }}
                        animate={{ 
                          strokeDasharray: `${(metric.value / 100) * 126} 126` 
                        }}
                        transition={{ 
                          duration: 1.2, 
                          delay: 0.7 + index * 0.1 + mIndex * 0.05,
                          ease: "easeOut"
                        }}
                      />
                    </svg>
                    <span className="absolute text-xs text-[#E6E8EB]">{metric.value}</span>
                    
                    {/* Nabız efekti */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          `0 0 0px ${metric.color}00`,
                          `0 0 15px ${metric.color}60`,
                          `0 0 0px ${metric.color}00`,
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: mIndex * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <p className="text-xs text-[#9FA8B3] tracking-[0.02em]">{metric.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Why Panel Trigger */}
          <motion.button
            onClick={() => onWhyClick(recommendation)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#15181D]/50 border border-[#2A3038] hover:border-[#4BB7FF]/50 transition-colors group/why"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-sm text-[#9FA8B3] group-hover/why:text-[#4BB7FF] transition-colors tracking-[0.02em]">
              Neden Bu Öneri?
            </span>
            <Info className="w-4 h-4 text-[#9FA8B3] group-hover/why:text-[#4BB7FF] transition-colors" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
