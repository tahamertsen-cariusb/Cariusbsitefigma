import { useState } from 'react';
import { ChatArea } from './components/ChatArea';
import { InsightDock } from './components/InsightDock';
import { FloatingNav } from './components/FloatingNav';
import { TopContextLayer } from './components/TopContextLayer';
import { ConsciousInputBar } from './components/ConsciousInputBar';
import { QuickChips } from './components/QuickChips';
import { RecommendationCard, type Recommendation } from './components/RecommendationCard';
import { WhyPanel } from './components/WhyPanel';
import { StatusFeedback, type StatusType } from './components/StatusFeedback';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ChatUserIndicator } from './components/ChatUserIndicator';
import { IdleParticles } from './components/IdleParticles';
import { ModeButtons } from './components/ModeButtons';
import { DeepSearchToggle } from './components/DeepSearchToggle';
import { SignupPage } from './components/SignupPage';
import { LoginPage } from './components/LoginPage';
import { PricingPage } from './components/PricingPage';
import { SettingsPage } from './components/SettingsPage';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'recommendations';
  recommendations?: Recommendation[];
}

type PageView = 'landing' | 'chat' | 'signup' | 'login' | 'pricing' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Veri analizi sistemine hoş geldiniz. Size nasıl yardımcı olabilirim?',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [activeNav, setActiveNav] = useState('chat');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [status, setStatus] = useState<{ type: StatusType; message: string }>({ type: null, message: '' });
  const [showQuickChips, setShowQuickChips] = useState(true);
  const [deepSearchEnabled, setDeepSearchEnabled] = useState(false);

  const handleSendMessage = (content: string) => {
    setShowQuickChips(false);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      type: 'text',
    };
    
    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI analysis with professional tone
    setTimeout(() => {
      const isRecommendationQuery = content.toLowerCase().includes('analiz') || 
                                    content.toLowerCase().includes('öneri') ||
                                    content.toLowerCase().includes('optimize');
      
      if (isRecommendationQuery) {
        // Return recommendations
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Veri analizi tamamlandı. En yüksek uyumlu 3 sonuç bulundu.',
          timestamp: new Date(),
          type: 'recommendations',
          recommendations: [
            {
              id: 'rec-1',
              title: 'Model Alpha - Optimize Edilmiş',
              description: 'Sistem dayanıklılığı ve performans dengesi açısından öneriliyor.',
              score: 94,
              metrics: [
                { label: 'Verimlilik', value: 96, color: '#44D07B' },
                { label: 'Performans', value: 92, color: '#4BB7FF' },
                { label: 'Maliyet', value: 89, color: '#E6E8EB' },
              ],
              reasoning: 'Bu model; yüksek verimlilik, güçlü performans ve dengeli maliyet parametrelerini birleştiriyor. Analiz sonucunda, kullanım alışkanlıklarınıza %94 uyum sağladığı tespit edildi. Özellikle sistem dayanıklılığı ve uzun vadeli optimizasyon açısından öne çıkıyor.',
            },
            {
              id: 'rec-2',
              title: 'Model Beta - Performans Odaklı',
              description: 'Yüksek hız ve işlem gücü gerektiren kullanımlar için ideal.',
              score: 87,
              metrics: [
                { label: 'Verimlilik', value: 82, color: '#44D07B' },
                { label: 'Performans', value: 98, color: '#4BB7FF' },
                { label: 'Maliyet', value: 78, color: '#E6E8EB' },
              ],
              reasoning: 'Performans merkezli bu konfigürasyon, yoğun işlem gerektiren görevlerde maksimum verim sağlıyor. Maliyet açısından daha yüksek olsa da, zaman kritik operasyonlarda üstün performans sunuyor.',
            },
            {
              id: 'rec-3',
              title: 'Model Gamma - Dengeli Çözüm',
              description: 'Tüm parametrelerde dengeli bir yaklaşım sunar.',
              score: 85,
              metrics: [
                { label: 'Verimlilik', value: 88, color: '#44D07B' },
                { label: 'Performans', value: 84, color: '#4BB7FF' },
                { label: 'Maliyet', value: 92, color: '#E6E8EB' },
              ],
              reasoning: 'Bu seçenek; maliyet, verimlilik ve performans arasında optimal denge kuruyor. Genel kullanım senaryoları için güvenilir ve sürdürülebilir bir çözüm.',
            },
          ],
        };
        setMessages((prev) => [...prev, aiResponse]);
        setStatus({ type: 'success', message: 'Analiz başarıyla tamamlandı.' });
      } else {
        // Standard response
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Gözlemliyorum. Bu konuda derin bir analiz yapıyorum. Stratejik bakış açınıza göre, en verimli yol parametrelerin dengeli değerlendirilmesi yönünde ilerlemek olabilir.',
          timestamp: new Date(),
          type: 'text',
        };
        setMessages((prev) => [...prev, aiResponse]);
      }
      
      setTimeout(() => setStatus({ type: null, message: '' }), 5000);
    }, 1500);
  };

  // Parallax effect for spatial hierarchy
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <div 
      className="relative min-h-screen bg-[#0C0E11] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Physical Layer - Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4BB7FF]/10 via-transparent to-[#4BB7FF]/5" />
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(75,183,255,0.15),transparent_50%)]"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      
      {/* Cosmic grid overlay - teknik yapı */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(42,48,56,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(42,48,56,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Conscious Layer - subtle glow */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(75, 183, 255, 0.1), transparent 70%)',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* Page Router */}
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 bg-[#0C0E11] z-20"
          >
            <LandingPage 
              isLoggedIn={isLoggedIn}
              userName={userName}
              onClose={() => setCurrentPage('chat')}
              onLogin={() => setCurrentPage('login')}
              onSignup={() => setCurrentPage('signup')}
              onLogout={() => {
                setIsLoggedIn(false);
                setUserName('');
              }}
              onSettings={() => setCurrentPage('settings')}
              onPricing={() => setCurrentPage('pricing')}
              onHome={() => setCurrentPage('landing')}
            />
          </motion.div>
        )}

        {currentPage === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20"
          >
            <SignupPage
              onSignup={(name, email, password) => {
                setUserName(name);
                setIsLoggedIn(true);
                setCurrentPage('chat');
              }}
              onSwitchToLogin={() => setCurrentPage('login')}
              onPricing={() => setCurrentPage('pricing')}
              onHome={() => setCurrentPage('landing')}
            />
          </motion.div>
        )}

        {currentPage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20"
          >
            <LoginPage
              onLogin={(email, password) => {
                setUserName(email.split('@')[0]);
                setIsLoggedIn(true);
                setCurrentPage('chat');
              }}
              onSwitchToSignup={() => setCurrentPage('signup')}
              onPricing={() => setCurrentPage('pricing')}
              onHome={() => setCurrentPage('landing')}
            />
          </motion.div>
        )}

        {currentPage === 'pricing' && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20"
          >
            <PricingPage
              isLoggedIn={isLoggedIn}
              userName={userName}
              onLogin={() => setCurrentPage('login')}
              onSignup={() => setCurrentPage('signup')}
              onLogout={() => {
                setIsLoggedIn(false);
                setUserName('');
                setCurrentPage('landing');
              }}
              onSettings={() => setCurrentPage('settings')}
              onSelectPlan={(plan) => {
                console.log('Selected plan:', plan);
                if (!isLoggedIn) {
                  setCurrentPage('signup');
                } else {
                  setCurrentPage('chat');
                }
              }}
            />
          </motion.div>
        )}

        {currentPage === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20"
          >
            {isLoggedIn ? (
              <SettingsPage
                userName={userName}
                onBack={() => setCurrentPage('chat')}
                onLogout={() => {
                  setIsLoggedIn(false);
                  setUserName('');
                  setCurrentPage('landing');
                }}
                onSave={(settings) => {
                  console.log('Settings saved:', settings);
                  setUserName(settings.name);
                  setStatus({ type: 'success', message: 'Ayarlar kaydedildi.' });
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                  <p className="text-[#E6E8EB] mb-4">Ayarlar sayfasına erişmek için giriş yapmalısınız.</p>
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="px-6 py-3 rounded-xl bg-[#4BB7FF] hover:bg-[#4BB7FF]/90 transition-all text-[#0C0E11]"
                  >
                    Giriş Yap
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cognitive Layer - Main chat content container */}
      {currentPage === 'chat' && (
        <div className="relative z-10 flex flex-col h-screen">
          <TopContextLayer />
          
          {/* Chat User Indicator + DeepSearch - top right, outside main content */}
          {isLoggedIn && (
            <div className="absolute top-4 right-6 z-50 flex items-center gap-3">
              <DeepSearchToggle size="small" />
              
              <ChatUserIndicator 
                userName={userName}
                onSettings={() => setCurrentPage('settings')}
                onLogout={() => {
                  setIsLoggedIn(false);
                  setUserName('');
                  setCurrentPage('landing');
                }}
                onHome={() => setCurrentPage('landing')}
              />
            </div>
          )}
          
          {/* Status Feedback */}
          {status.type && (
            <div className="px-6 pt-2">
              <StatusFeedback 
                type={status.type} 
                message={status.message}
                onClose={() => setStatus({ type: null, message: '' })}
              />
            </div>
          )}
          
          {/* Main Content Area - with proper spacing for top indicators */}
          <div className="flex flex-1 gap-6 px-6 pb-6 overflow-hidden pt-20">
            {/* Left: Floating Nav */}
            <FloatingNav 
              activeNav={activeNav} 
              onNavChange={setActiveNav}
              onHome={() => setCurrentPage('landing')}
              onSettings={() => setCurrentPage('settings')}
            />
            
            {/* Center: Chat */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Quick Chips - appears at start */}
              {showQuickChips && messages.length <= 1 && (
                <QuickChips onSelect={handleSendMessage} />
              )}
              
              <ChatArea 
                messages={messages} 
                onWhyClick={setSelectedRecommendation}
              />
              <ConsciousInputBar onSend={handleSendMessage} />
            </div>
            
            {/* Right: InsightDock - no extra padding needed now */}
            <InsightDock />
          </div>
        </div>
      )}
      
      {/* Why Panel - slides from right */}
      <WhyPanel 
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
      
      {/* Idle Particles */}
      <IdleParticles />
      
      {/* Mode Buttons - only on Landing and Chat */}
      {(currentPage === 'landing' || currentPage === 'chat') && (
        <ModeButtons onModeChange={(mode) => console.log('Mode changed:', mode)} />
      )}
    </div>
  );
}