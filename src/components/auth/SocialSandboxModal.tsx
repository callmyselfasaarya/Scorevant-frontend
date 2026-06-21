import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertTriangle, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SocialSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: 'google' | 'facebook' | 'apple' | null;
  onSuccess: () => void;
}

const PRESET_USERS = {
  google: [
    { name: 'Aarya Google Test', email: 'aarya.google@scorevant.com' },
    { name: 'John Doe', email: 'john.doe@gmail.com' },
  ],
  facebook: [
    { name: 'Aarya Facebook Test', email: 'aarya.facebook@scorevant.com' },
    { name: 'Jane Smith', email: 'jane.smith@facebook.com' },
  ],
  apple: [
    { name: 'Aarya Apple Test', email: 'aarya.apple@scorevant.com' },
    { name: 'Alex Mercer', email: 'alex.mercer@apple.com' },
  ],
};

export default function SocialSandboxModal({
  isOpen,
  onClose,
  provider,
  onSuccess,
}: SocialSandboxModalProps) {
  const { loginWithGoogle, loginWithFacebook, loginWithApple } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!provider) return null;

  const handleSimulate = async (email: string, name: string) => {
    if (!email) {
      setError('Email is required');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      // Create mock token format: mock_provider_token_email_encodedName
      const encodedName = encodeURIComponent(name);
      const mockToken = `mock_${provider}_token_${email}_${encodedName}`;

      if (provider === 'google') {
        await loginWithGoogle(mockToken);
      } else if (provider === 'facebook') {
        await loginWithFacebook(mockToken);
      } else if (provider === 'apple') {
        await loginWithApple(mockToken);
      }
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Simulation authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const presets = PRESET_USERS[provider] || [];

  const providerNames = {
    google: 'Google',
    facebook: 'Facebook',
    apple: 'Apple',
  };

  const providerColors = {
    google: 'text-[#EA4335]',
    facebook: 'text-[#1877F2]',
    apple: 'text-white',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-md bg-zinc-950/90 border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden backdrop-blur-2xl z-10"
          >
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F4C542]/10 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-[50px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between relative mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#F4C542] animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-[#F4C542] font-black">
                    OAuth Sandbox
                  </span>
                </div>
                <h3 className="text-2xl font-black tracking-tight">
                  Simulate <span className={providerColors[provider]}>{providerNames[provider]}</span> Login
                </h3>
                <p className="text-xs text-white/40">
                  Secure local simulation sandbox for development mode.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Warning Box */}
            <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl mb-6">
              <AlertTriangle className="w-5 h-5 text-[#F4C542] shrink-0 mt-0.5" />
              <div className="text-[11px] text-white/70 leading-relaxed">
                Scorevant detected that <strong>{providerNames[provider]}</strong> client keys are not set. Running in development mode using simulated token validation.
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-6">
              <button
                onClick={() => setActiveTab('presets')}
                className={`pb-3 text-xs uppercase tracking-widest font-bold border-b-2 transition-all mr-6 ${
                  activeTab === 'presets'
                    ? 'border-[#F4C542] text-white'
                    : 'border-transparent text-white/40 hover:text-white/60'
                }`}
              >
                Preset Profiles
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`pb-3 text-xs uppercase tracking-widest font-bold border-b-2 transition-all ${
                  activeTab === 'custom'
                    ? 'border-[#F4C542] text-white'
                    : 'border-transparent text-white/40 hover:text-white/60'
                }`}
              >
                Custom Account
              </button>
            </div>

            {/* Error display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold py-3 px-4 rounded-xl mb-5 text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content Tabs */}
            {activeTab === 'presets' ? (
              <div className="space-y-3">
                {presets.map((u, i) => (
                  <button
                    key={i}
                    disabled={isLoading}
                    onClick={() => handleSimulate(u.email, u.name)}
                    className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/20 rounded-2xl hover:bg-white/10 text-left transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 group-hover:bg-[#F4C542]/10 group-hover:text-[#F4C542] transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{u.name}</div>
                        <div className="text-[11px] text-white/40">{u.email}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSimulate(customEmail, customName);
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F4C542]/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter mock email address"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#F4C542]/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-[#F4C542] text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center shadow-lg"
                >
                  {isLoading ? 'Authenticating...' : 'Simulate Social Login'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
