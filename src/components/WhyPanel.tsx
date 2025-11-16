import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Recommendation } from './RecommendationCard';

interface WhyPanelProps {
  recommendation: Recommendation | null;
  onClose: () => void;
}

export function WhyPanel({ recommendation, onClose }: WhyPanelProps) {
  return (
    <AnimatePresence>
      {recommendation && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#0C0E11]/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="h-full glass-panel border-l border-[#2A3038] flex flex-col overflow-hidden">
              {/* Blueprint overlay - açıldığında belirir */}
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(rgba(75,183,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(75,183,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              
              {/* Header */}
              <div className="relative px-6 py-5 border-b border-[#2A3038]">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-[#E6E8EB] mb-1 tracking-[-0.01em]">
                      Analiz Detayları
                    </h2>
                    <p className="text-sm text-[#9FA8B3]">{recommendation.title}</p>
                  </div>
                  
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-lg glass-panel border-[#2A3038] hover:border-[#4BB7FF]/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-[#9FA8B3]" />
                  </motion.button>
                </div>
                
                {/* Mavi nabız animasyonu */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4BB7FF] to-transparent"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="relative flex-1 overflow-y-auto scrollbar-thin p-6 space-y-6">
                {/* Score Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative rounded-xl glass-panel border-[#2A3038] p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <svg className="w-20 h-20 -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="rgba(42,48,56,0.5)"
                          strokeWidth="4"
                          fill="none"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="#4BB7FF"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "0 220" }}
                          animate={{ 
                            strokeDasharray: `${(recommendation.score / 100) * 220} 220` 
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl text-[#E6E8EB]">{recommendation.score}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-[#E6E8EB] mb-1">Uyum Skoru</h3>
                      <p className="text-sm text-[#9FA8B3] leading-relaxed">
                        Bu skor; tüm parametrelerin dengeli değerlendirilmesi sonucu hesaplandı.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Reasoning Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="text-[#E6E8EB] flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#44D07B]" />
                    Neden Bu Öneri?
                  </h3>
                  <div className="relative rounded-xl glass-panel border-[#2A3038] p-5">
                    <p className="text-[#E6E8EB] leading-relaxed">
                      {recommendation.reasoning}
                    </p>
                  </div>
                </motion.div>
                
                {/* Metrics Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <h3 className="text-[#E6E8EB] flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#4BB7FF]" />
                    Parametre Analizi
                  </h3>
                  
                  <div className="space-y-3">
                    {recommendation.metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="relative rounded-xl glass-panel border-[#2A3038] p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#E6E8EB]">{metric.label}</span>
                          <span className="text-sm text-[#E6E8EB]">{metric.value}%</span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="relative h-2 bg-[#15181D] rounded-full overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ backgroundColor: metric.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ 
                              duration: 1,
                              delay: 0.5 + index * 0.1,
                              ease: "easeOut"
                            }}
                          />
                          
                          {/* Glow effect */}
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full blur-sm"
                            style={{ backgroundColor: metric.color, opacity: 0.5 }}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ 
                              duration: 1,
                              delay: 0.5 + index * 0.1,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* System Note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative rounded-xl bg-[#4BB7FF]/10 border border-[#4BB7FF]/30 p-4"
                >
                  <p className="text-xs text-[#9FA8B3] leading-relaxed tracking-[0.02em]">
                    Bu analiz; sistem dayanıklılığı, kullanım sıklığı ve optimizasyon parametreleri 
                    dengelenerek oluşturuldu. Alternatif modelleri görmek için ana ekrana dönebilirsiniz.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
