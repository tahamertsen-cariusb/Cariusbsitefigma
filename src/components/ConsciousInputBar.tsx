import { motion } from 'motion/react';
import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ConsciousInputBarProps {
  onSend: (message: string) => void;
}

export function ConsciousInputBar({ onSend }: ConsciousInputBarProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <motion.div 
      className="relative mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Breathing glow - idle state */}
      {!isFocused && input.length === 0 && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[#4BB7FF]/20 via-[#4BB7FF]/30 to-[#4BB7FF]/20 rounded-2xl blur-lg"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Enhanced glow when focused */}
      {isFocused && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[#4BB7FF]/30 via-[#4BB7FF]/50 to-[#4BB7FF]/30 rounded-2xl blur-lg"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Glass panel container - metalic panel */}
      <div className="relative rounded-2xl glass-panel border-[#2A3038] p-4">
        {/* Inner shadow effect - içe gölgelenmiş */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]" />
        
        <div className="relative flex items-end gap-3">
          {/* Input area */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Mesajınızı yazın..."
              className="w-full bg-transparent text-[#E6E8EB] placeholder:text-[#9FA8B3] resize-none outline-none min-h-[60px] max-h-[200px]"
              rows={2}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          
          {/* Send button with breathing animation - ışık halkası */}
          <motion.button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="relative p-3 rounded-xl bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/80 disabled:opacity-30 disabled:cursor-not-allowed metal-reflection"
            whileHover={input.trim() ? { scale: 1.05 } : {}}
            whileTap={input.trim() ? { scale: 0.95 } : {}}
          >
            {/* Breathing light ring - bilinç nabzı */}
            {input.trim() && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-[#E6E8EB]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            
            <Send className="w-5 h-5 text-[#0C0E11]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}