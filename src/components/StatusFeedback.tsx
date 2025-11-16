import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export type StatusType = 'success' | 'error' | 'warning' | null;

interface StatusFeedbackProps {
  type: StatusType;
  message: string;
  onClose?: () => void;
}

export function StatusFeedback({ type, message, onClose }: StatusFeedbackProps) {
  if (!type) return null;
  
  const config = {
    success: {
      icon: CheckCircle2,
      color: '#44D07B',
      bgColor: 'rgba(68, 208, 123, 0.1)',
      borderColor: 'rgba(68, 208, 123, 0.3)',
    },
    error: {
      icon: XCircle,
      color: '#D24A50',
      bgColor: 'rgba(210, 74, 80, 0.1)',
      borderColor: 'rgba(210, 74, 80, 0.3)',
    },
    warning: {
      icon: AlertCircle,
      color: '#4BB7FF',
      bgColor: 'rgba(75, 183, 255, 0.1)',
      borderColor: 'rgba(75, 183, 255, 0.3)',
    },
  };
  
  const { icon: Icon, color, bgColor, borderColor } = config[type];
  
  return (
    <AnimatePresence>
      <motion.div
        className="relative rounded-xl glass-panel p-4 overflow-hidden"
        style={{ 
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Glow wave for success/error */}
        {(type === 'success' || type === 'error') && (
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: color, opacity: 0.1 }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        )}
        
        {/* Micropulse for error */}
        {type === 'error' && (
          <motion.div
            className="absolute inset-0 border-2 rounded-xl"
            style={{ borderColor: color }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        <div className="relative flex items-center gap-3">
          <div className="relative">
            {/* Icon glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-md"
              style={{ backgroundColor: color, opacity: 0.4 }}
              animate={{
                scale: type === 'success' ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            />
            
            <Icon className="w-5 h-5 relative z-10" style={{ color }} />
          </div>
          
          <p className="flex-1 text-[#E6E8EB] leading-relaxed">{message}</p>
          
          {onClose && (
            <motion.button
              onClick={onClose}
              className="text-[#9FA8B3] hover:text-[#E6E8EB] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XCircle className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
