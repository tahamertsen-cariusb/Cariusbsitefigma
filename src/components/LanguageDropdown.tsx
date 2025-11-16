import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

type LanguageCode = 'en' | 'tr' | 'it' | 'fr' | 'de' | 'es';

interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

interface LanguageDropdownProps {
  onChange?: (lang: LanguageCode) => void;
}

export function LanguageDropdown({ onChange }: LanguageDropdownProps) {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('tr');
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<LanguageCode | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    setSelectedLang(code);
    setIsOpen(false);
    onChange?.(code);
  };

  const selectedLanguage = languages.find(l => l.code === selectedLang);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel border-[#2A3038] backdrop-blur-xl hover:border-[#4BB7FF]/30 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg">{selectedLanguage?.flag}</span>
        <span className="text-sm text-[#E6E8EB] uppercase tracking-wider">
          {selectedLanguage?.code}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[#9FA8B3]" />
        </motion.div>

        {/* Subtle glow on open */}
        {isOpen && (
          <motion.div
            className="absolute -inset-1 rounded-lg"
            style={{
              background: 'radial-gradient(circle, rgba(75, 183, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-56 rounded-xl glass-panel border-[#2A3038] backdrop-blur-xl overflow-hidden z-50"
            style={{
              boxShadow: '0 0 24px rgba(0, 0, 0, 0.35)',
            }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Dropdown glow */}
            <motion.div
              className="absolute -inset-1 rounded-xl"
              style={{
                background: 'radial-gradient(circle, rgba(75, 183, 255, 0.1) 0%, transparent 70%)',
                filter: 'blur(12px)',
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

            <div className="relative py-1">
              {languages.map((lang, index) => {
                const isSelected = lang.code === selectedLang;
                const isHovered = hoveredLang === lang.code;

                return (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    onMouseEnter={() => setHoveredLang(lang.code)}
                    onMouseLeave={() => setHoveredLang(null)}
                    className="relative w-full px-4 py-2.5 flex items-center justify-between group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    {/* Hover background */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-[#2A3038]/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}

                    {/* Left accent bar on hover */}
                    {isHovered && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#4BB7FF]"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Content */}
                    <div className="relative flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-[#E6E8EB] uppercase tracking-wider">
                          {lang.code}
                        </span>
                        <span className="text-xs text-[#9FA8B3]">{lang.name}</span>
                      </div>
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div
                        className="relative flex items-center gap-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Dot indicator */}
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-[#4BB7FF]"
                          animate={{
                            boxShadow: [
                              '0 0 0px rgba(75, 183, 255, 0)',
                              '0 0 8px rgba(75, 183, 255, 0.8)',
                              '0 0 0px rgba(75, 183, 255, 0)',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <Check className="w-4 h-4 text-[#4BB7FF]" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
