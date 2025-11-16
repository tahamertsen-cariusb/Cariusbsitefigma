import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import { RecommendationCard, type Recommendation } from './RecommendationCard';
import { LoadingState } from './LoadingState';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'recommendations' | 'loading';
  recommendations?: Recommendation[];
}

interface ChatAreaProps {
  messages: Message[];
  onWhyClick: (recommendation: Recommendation) => void;
}

export function ChatArea({ messages, onWhyClick }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <motion.div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.23, 1, 0.32, 1]
            }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'loading' ? (
              <LoadingState message={message.content} />
            ) : message.type === 'recommendations' && message.recommendations ? (
              <div className="w-full space-y-3">
                {/* AI message header */}
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-2xl px-6 py-4 glass-panel border-[#2A3038] backdrop-blur-xl">
                    <div className="absolute inset-0 rounded-2xl glass-overlay" />
                    <p className="relative text-[#E6E8EB] leading-relaxed">{message.content}</p>
                    <motion.div 
                      className="mt-2 text-xs text-[#9FA8B3] tracking-[0.02em]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {message.timestamp.toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </motion.div>
                  </div>
                </div>
                
                {/* Recommendation cards */}
                <div className="grid gap-3">
                  {message.recommendations.map((rec, recIndex) => (
                    <RecommendationCard
                      key={rec.id}
                      recommendation={rec}
                      index={recIndex}
                      onWhyClick={onWhyClick}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={`relative max-w-[70%] rounded-2xl px-6 py-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-[#4BB7FF]/30 to-[#4BB7FF]/20 border border-[#4BB7FF]/40'
                    : 'glass-panel border-[#2A3038]'
                } backdrop-blur-xl`}
              >
                {/* Glass reflection effect - glass overlay */}
                <div className="absolute inset-0 rounded-2xl glass-overlay" />
                
                {/* Liquid glow for AI messages - sıvı bilinç akışı */}
                {message.role === 'assistant' && (
                  <>
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-r from-[#4BB7FF]/20 via-[#4BB7FF]/30 to-[#4BB7FF]/20 rounded-2xl blur-sm -z-10 liquid-flow"
                      style={{
                        backgroundSize: '200% 200%',
                      }}
                    />
                    {/* Soft white light pulse - sezgi ve aydınlanma */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      animate={{
                        boxShadow: [
                          '0 0 0px rgba(230, 232, 235, 0)',
                          '0 0 20px rgba(230, 232, 235, 0.1)',
                          '0 0 0px rgba(230, 232, 235, 0)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </>
                )}
                
                <p className="relative text-[#E6E8EB] leading-relaxed">{message.content}</p>
                
                <motion.div 
                  className="mt-2 text-xs text-[#9FA8B3] tracking-[0.02em]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {message.timestamp.toLocaleTimeString('tr-TR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}