import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Analiz ediyorum...' }: LoadingStateProps) {
  return (
    <motion.div
      className="flex items-center gap-3 px-6 py-4 rounded-2xl glass-panel border-[#2A3038]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Breathing motion loader */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-[#4BB7FF]/30 rounded-full blur-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Loader2 className="w-5 h-5 text-[#4BB7FF]" />
        </motion.div>
      </div>
      
      <div className="flex-1">
        <p className="text-[#E6E8EB] mb-1">{message}</p>
        
        {/* Animated dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#4BB7FF]"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
