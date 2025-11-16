import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Zap, Search } from 'lucide-react';

interface QuickChipsProps {
  onSelect: (query: string) => void;
}

const quickQueries = [
  {
    id: 1,
    icon: Sparkles,
    label: 'Sezgisel Analiz',
    query: 'Verilerimi analiz et ve optimize edilebilecek alanları göster.',
  },
  {
    id: 2,
    icon: TrendingUp,
    label: 'Performans Raporu',
    query: 'Sistem performansını değerlendir ve önerilerde bulun.',
  },
  {
    id: 3,
    icon: Zap,
    label: 'Hızlı Öneriler',
    query: 'En yüksek uyumlu çözümleri listele.',
  },
  {
    id: 4,
    icon: Search,
    label: 'Detaylı Araştırma',
    query: 'Tüm parametreleri incele ve derinlemesine analiz yap.',
  },
];

export function QuickChips({ onSelect }: QuickChipsProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-2 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {quickQueries.map((chip, index) => {
        const Icon = chip.icon;
        
        return (
          <motion.button
            key={chip.id}
            onClick={() => onSelect(chip.query)}
            className="relative group px-4 py-2 rounded-lg glass-panel border-[#2A3038] hover:border-[#4BB7FF]/50 transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hover neon flow line */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#4BB7FF]/0 via-[#4BB7FF]/20 to-[#4BB7FF]/0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="relative flex items-center gap-2">
              <Icon className="w-4 h-4 text-[#4BB7FF]" />
              <span className="text-sm text-[#E6E8EB] tracking-[0.02em]">{chip.label}</span>
            </div>
            
            {/* Mavi akış hattı efekti on hover */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4BB7FF] to-transparent"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        );
      })}
    </motion.div>
  );
}
