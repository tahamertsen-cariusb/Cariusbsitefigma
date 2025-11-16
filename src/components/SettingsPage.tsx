import { motion } from 'motion/react';
import { ArrowLeft, User, Bell, Shield, Zap, Globe, Moon, LogOut, ChevronRight, Save } from 'lucide-react';
import { useState } from 'react';

interface SettingsPageProps {
  userName: string;
  onBack: () => void;
  onLogout: () => void;
  onSave: (settings: UserSettings) => void;
}

interface UserSettings {
  name: string;
  email: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    insights: boolean;
  };
  deepSearch: {
    autoEnabled: boolean;
    defaultModel: string;
  };
  privacy: {
    dataCollection: boolean;
    analytics: boolean;
  };
}

export function SettingsPage({ userName, onBack, onLogout, onSave }: SettingsPageProps) {
  const [settings, setSettings] = useState<UserSettings>({
    name: userName,
    email: `${userName.toLowerCase()}@example.com`,
    language: 'tr',
    notifications: {
      email: true,
      push: false,
      insights: true,
    },
    deepSearch: {
      autoEnabled: false,
      defaultModel: 'balanced',
    },
    privacy: {
      dataCollection: true,
      analytics: true,
    },
  });

  const [activeSection, setActiveSection] = useState<string>('profile');
  const [hasChanges, setHasChanges] = useState(false);

  const updateSettings = (path: string, value: any) => {
    setSettings((prev) => {
      const keys = path.split('.');
      const newSettings = { ...prev };
      let current: any = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(settings);
    setHasChanges(false);
  };

  const sections = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'deepsearch', label: 'Deep Search', icon: Zap },
    { id: 'privacy', label: 'Gizlilik', icon: Shield },
    { id: 'appearance', label: 'Görünüm', icon: Moon },
    { id: 'language', label: 'Dil', icon: Globe },
  ];

  return (
    <div className="relative min-h-screen bg-[#0C0E11] overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4BB7FF]/10 via-transparent to-[#4BB7FF]/5" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(42,48,56,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(42,48,56,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4BB7FF]/20 blur-[120px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 border-b border-white/10 backdrop-blur-xl bg-[#0C0E11]/80"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 lg:py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 lg:gap-6 min-w-0">
                <button
                  onClick={onBack}
                  className="group flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex-shrink-0"
                >
                  <ArrowLeft className="w-4 h-4 text-[#E6E8EB] group-hover:text-[#4BB7FF] transition-colors" />
                  <span className="text-[#E6E8EB] hidden sm:inline">Geri</span>
                </button>
                
                <div className="min-w-0">
                  <h1 className="text-[#E6E8EB] tracking-wide truncate">Ayarlar</h1>
                  <p className="text-[#E6E8EB]/60 text-sm mt-1 hidden sm:block">Hesap ve tercihlerinizi yönetin</p>
                </div>
              </div>

              {hasChanges && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl bg-[#4BB7FF] hover:bg-[#4BB7FF]/90 transition-all duration-300 group flex-shrink-0"
                >
                  <Save className="w-4 h-4 text-[#0C0E11] group-hover:scale-110 transition-transform" />
                  <span className="text-[#0C0E11] hidden sm:inline">Değişiklikleri Kaydet</span>
                  <span className="text-[#0C0E11] sm:hidden">Kaydet</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Sidebar Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-3"
              >
                <div className="lg:sticky lg:top-6 space-y-2">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                          isActive
                            ? 'bg-[#4BB7FF]/20 border border-[#4BB7FF]/40'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 transition-colors ${
                            isActive ? 'text-[#4BB7FF]' : 'text-[#E6E8EB]/60 group-hover:text-[#E6E8EB]'
                          }`}
                        />
                        <span
                          className={`flex-1 text-left truncate ${
                            isActive ? 'text-[#4BB7FF]' : 'text-[#E6E8EB]/80 group-hover:text-[#E6E8EB]'
                          }`}
                        >
                          {section.label}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 transition-all ${
                            isActive
                              ? 'text-[#4BB7FF] opacity-100 translate-x-0'
                              : 'text-[#E6E8EB]/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                        />
                      </motion.button>
                    );
                  })}

                  {/* Logout Button */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + sections.length * 0.05 }}
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 group mt-6"
                  >
                    <LogOut className="w-5 h-5 flex-shrink-0 text-red-400 group-hover:text-red-300 transition-colors" />
                    <span className="flex-1 text-left text-red-400 group-hover:text-red-300 transition-colors truncate">
                      Çıkış Yap
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Settings Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-9"
              >
                <div className="space-y-6">
                  {/* Profile Section */}
                  {activeSection === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <SettingsCard title="Profil Bilgileri" description="Hesap bilgilerinizi güncelleyin">
                        <div className="space-y-4">
                          <SettingField label="İsim">
                            <input
                              type="text"
                              value={settings.name}
                              onChange={(e) => updateSettings('name', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#E6E8EB] placeholder:text-[#E6E8EB]/40 focus:outline-none focus:border-[#4BB7FF]/50 focus:bg-white/10 transition-all"
                            />
                          </SettingField>
                          
                          <SettingField label="E-posta">
                            <input
                              type="email"
                              value={settings.email}
                              onChange={(e) => updateSettings('email', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#E6E8EB] placeholder:text-[#E6E8EB]/40 focus:outline-none focus:border-[#4BB7FF]/50 focus:bg-white/10 transition-all"
                            />
                          </SettingField>
                        </div>
                      </SettingsCard>

                      <SettingsCard title="Avatar" description="Profil görselinizi seçin">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4BB7FF] to-[#4BB7FF]/60 flex items-center justify-center">
                            <span className="text-2xl text-[#0C0E11]">
                              {settings.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#4BB7FF]/40 transition-all text-[#E6E8EB] text-sm">
                              Görsel Yükle
                            </button>
                            <p className="text-[#E6E8EB]/40 text-sm mt-2">PNG, JPG veya GIF (max. 2MB)</p>
                          </div>
                        </div>
                      </SettingsCard>
                    </motion.div>
                  )}

                  {/* Notifications Section */}
                  {activeSection === 'notifications' && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SettingsCard title="Bildirim Tercihleri" description="Hangi bildirimleri almak istediğinizi seçin">
                        <div className="space-y-4">
                          <ToggleSetting
                            label="E-posta Bildirimleri"
                            description="Önemli güncellemeler için e-posta alın"
                            enabled={settings.notifications.email}
                            onChange={(value) => updateSettings('notifications.email', value)}
                          />
                          
                          <ToggleSetting
                            label="Push Bildirimleri"
                            description="Tarayıcı bildirimleri gönderin"
                            enabled={settings.notifications.push}
                            onChange={(value) => updateSettings('notifications.push', value)}
                          />
                          
                          <ToggleSetting
                            label="Insight Bildirimleri"
                            description="Yeni içgörüler hazır olduğunda bildir"
                            enabled={settings.notifications.insights}
                            onChange={(value) => updateSettings('notifications.insights', value)}
                          />
                        </div>
                      </SettingsCard>
                    </motion.div>
                  )}

                  {/* Deep Search Section */}
                  {activeSection === 'deepsearch' && (
                    <motion.div
                      key="deepsearch"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <SettingsCard title="Deep Search Ayarları" description="Derin arama özelliklerini yapılandırın">
                        <div className="space-y-4">
                          <ToggleSetting
                            label="Otomatik Deep Search"
                            description="Her aramada derin analizi etkinleştir"
                            enabled={settings.deepSearch.autoEnabled}
                            onChange={(value) => updateSettings('deepSearch.autoEnabled', value)}
                          />
                          
                          <SettingField label="Varsayılan Model">
                            <select
                              value={settings.deepSearch.defaultModel}
                              onChange={(e) => updateSettings('deepSearch.defaultModel', e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#E6E8EB] focus:outline-none focus:border-[#4BB7FF]/50 focus:bg-white/10 transition-all cursor-pointer [&>option]:bg-[#0C0E11] [&>option]:text-[#E6E8EB]"
                            >
                              <option value="fast">Hızlı Analiz</option>
                              <option value="balanced">Dengeli (Önerilen)</option>
                              <option value="deep">Derin Analiz</option>
                            </select>
                          </SettingField>
                        </div>
                      </SettingsCard>

                      <SettingsCard title="Model Detayları" description="Her modelin özellikleri">
                        <div className="space-y-3">
                          <ModelInfo
                            name="Hızlı Analiz"
                            description="Temel analiz, düşük kaynak kullanımı"
                            speed={95}
                            accuracy={75}
                          />
                          <ModelInfo
                            name="Dengeli"
                            description="Hız ve doğruluk dengesinde optimum"
                            speed={80}
                            accuracy={90}
                          />
                          <ModelInfo
                            name="Derin Analiz"
                            description="Maksimum doğruluk, detaylı içgörüler"
                            speed={60}
                            accuracy={98}
                          />
                        </div>
                      </SettingsCard>
                    </motion.div>
                  )}

                  {/* Privacy Section */}
                  {activeSection === 'privacy' && (
                    <motion.div
                      key="privacy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SettingsCard title="Gizlilik ve Güvenlik" description="Veri ve gizlilik ayarlarınız">
                        <div className="space-y-4">
                          <ToggleSetting
                            label="Veri Toplama"
                            description="Ürün iyileştirmeleri için anonim veri paylaşımı"
                            enabled={settings.privacy.dataCollection}
                            onChange={(value) => updateSettings('privacy.dataCollection', value)}
                          />
                          
                          <ToggleSetting
                            label="Analitik"
                            description="Kullanım istatistiklerini topla ve analiz et"
                            enabled={settings.privacy.analytics}
                            onChange={(value) => updateSettings('privacy.analytics', value)}
                          />
                        </div>
                      </SettingsCard>
                    </motion.div>
                  )}

                  {/* Appearance Section */}
                  {activeSection === 'appearance' && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SettingsCard title="Görünüm" description="Arayüz teması ve görsel tercihler">
                        <div className="space-y-4">
                          <SettingField label="Tema">
                            <div className="grid grid-cols-3 gap-4">
                              <ThemeOption
                                name="Dark Mystic"
                                description="Varsayılan tema"
                                selected={true}
                                color="#4BB7FF"
                              />
                              <ThemeOption
                                name="Pure Dark"
                                description="Yakında"
                                selected={false}
                                color="#1a1a1a"
                                disabled
                              />
                              <ThemeOption
                                name="Abyss"
                                description="Yakında"
                                selected={false}
                                color="#000000"
                                disabled
                              />
                            </div>
                          </SettingField>
                        </div>
                      </SettingsCard>
                    </motion.div>
                  )}

                  {/* Language Section */}
                  {activeSection === 'language' && (
                    <motion.div
                      key="language"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SettingsCard title="Dil Tercihleri" description="Arayüz dilini seçin">
                        <SettingField label="Arayüz Dili">
                          <select
                            value={settings.language}
                            onChange={(e) => updateSettings('language', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#E6E8EB] focus:outline-none focus:border-[#4BB7FF]/50 focus:bg-white/10 transition-all cursor-pointer [&>option]:bg-[#0C0E11] [&>option]:text-[#E6E8EB]"
                          >
                            <option value="tr">Türkçe</option>
                            <option value="en">English</option>
                            <option value="de">Deutsch</option>
                            <option value="fr">Français</option>
                          </select>
                        </SettingField>
                      </SettingsCard>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="mb-6">
        <h3 className="text-[#E6E8EB] mb-1">{title}</h3>
        <p className="text-[#E6E8EB]/60 text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
}

function SettingField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-[#E6E8EB]/80 text-sm">{label}</label>
      {children}
    </div>
  );
}

function ToggleSetting({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
      <div className="flex-1 min-w-0">
        <div className="text-[#E6E8EB] mb-1">{label}</div>
        <div className="text-[#E6E8EB]/60 text-sm">{description}</div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-all duration-300 ${
          enabled ? 'bg-[#4BB7FF]' : 'bg-white/20'
        }`}
        aria-label={`Toggle ${label}`}
      >
        <motion.div
          animate={{ x: enabled ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-lg"
        />
      </button>
    </div>
  );
}

function ModelInfo({
  name,
  description,
  speed,
  accuracy,
}: {
  name: string;
  description: string;
  speed: number;
  accuracy: number;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[#E6E8EB]">{name}</div>
          <div className="text-[#E6E8EB]/60 text-sm">{description}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#E6E8EB]/60 text-sm">Hız</span>
            <span className="text-[#4BB7FF] text-sm">{speed}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${speed}%` }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full bg-[#4BB7FF] rounded-full"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#E6E8EB]/60 text-sm">Doğruluk</span>
            <span className="text-[#44D07B] text-sm">{accuracy}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-full bg-[#44D07B] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeOption({
  name,
  description,
  selected,
  color,
  disabled = false,
}: {
  name: string;
  description: string;
  selected: boolean;
  color: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={`p-4 rounded-xl border transition-all ${
        disabled
          ? 'opacity-50 cursor-not-allowed bg-white/5 border-white/10'
          : selected
          ? 'bg-[#4BB7FF]/20 border-[#4BB7FF]/40'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
    >
      <div
        className="w-full h-16 rounded-lg mb-3"
        style={{ backgroundColor: color }}
      />
      <div className={`text-sm mb-1 ${selected ? 'text-[#4BB7FF]' : 'text-[#E6E8EB]'}`}>
        {name}
      </div>
      <div className="text-[#E6E8EB]/60 text-xs">{description}</div>
    </button>
  );
}