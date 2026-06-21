import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FadeIn } from '../../components/MotionWrappers';
import { Mail, Lock, Loader2, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import SocialSandboxModal from '../../components/auth/SocialSandboxModal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'google' | 'facebook' | 'apple' | null>(null);
  
  const { login, loginWithGoogle, loginWithFacebook, loginWithApple } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      setLocation('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
    setError(null);
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
    const appleClientId = import.meta.env.VITE_APPLE_CLIENT_ID;

    if (provider === 'google' && googleClientId) {
      startRealGoogleLogin(googleClientId);
    } else if (provider === 'facebook' && facebookAppId) {
      startRealFacebookLogin(facebookAppId);
    } else if (provider === 'apple' && appleClientId) {
      startRealAppleLogin(appleClientId);
    } else {
      // Fallback to simulation sandbox modal in development environment
      if (import.meta.env.DEV) {
        setSelectedProvider(provider);
        setIsSandboxOpen(true);
      } else {
        setError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} configuration is missing.`);
      }
    }
  };

  const startRealGoogleLogin = (clientId: string) => {
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => initRealGoogle(clientId);
      document.head.appendChild(script);
    } else {
      initRealGoogle(clientId);
    }
  };

  const initRealGoogle = (clientId: string) => {
    const google = (window as any).google;
    google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: any) => {
        setIsSubmitting(true);
        try {
          await loginWithGoogle(response.credential);
          setLocation('/dashboard');
        } catch (err: any) {
          setError(err.message || 'Google authentication failed.');
        } finally {
          setIsSubmitting(false);
        }
      },
    });
    google.accounts.id.prompt();
  };

  const startRealFacebookLogin = (appId: string) => {
    if (!(window as any).FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.onload = () => initRealFacebook(appId);
      document.head.appendChild(script);
    } else {
      initRealFacebook(appId);
    }
  };

  const initRealFacebook = (appId: string) => {
    const FB = (window as any).FB;
    FB.init({
      appId: appId,
      cookie: true,
      xfbml: true,
      version: 'v19.0',
    });
    FB.login(
      async (response: any) => {
        if (response.authResponse) {
          setIsSubmitting(true);
          try {
            await loginWithFacebook(response.authResponse.accessToken);
            setLocation('/dashboard');
          } catch (err: any) {
            setError(err.message || 'Facebook authentication failed.');
          } finally {
            setIsSubmitting(false);
          }
        }
      },
      { scope: 'email,public_profile' }
    );
  };

  const startRealAppleLogin = (clientId: string) => {
    if (!(window as any).AppleID) {
      const script = document.createElement('script');
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      script.async = true;
      script.onload = () => initRealApple(clientId);
      document.head.appendChild(script);
    } else {
      initRealApple(clientId);
    }
  };

  const initRealApple = async (clientId: string) => {
    const AppleID = (window as any).AppleID;
    AppleID.auth.init({
      clientId: clientId,
      scope: 'name email',
      redirectURI: window.location.origin + '/login',
      usePopup: true,
    });
    try {
      const response = await AppleID.auth.signIn();
      if (response.authorization && response.authorization.id_token) {
        setIsSubmitting(true);
        await loginWithApple(response.authorization.id_token);
        setLocation('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Apple authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#F4C542]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <FadeIn className="relative z-10 w-full max-w-md">
        <div className="glass-panel-heavy p-10 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl bg-black/60 space-y-6">
          
          <div className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-16 h-16 bg-[#F4C542]/10 rounded-2xl border border-[#F4C542]/20 mx-auto flex items-center justify-center mb-4"
            >
              <Lock className="w-8 h-8 text-[#F4C542]" />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tighter">Welcome Back.</h1>
            <p className="text-white/40 text-sm font-medium">
              Access your officiating dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-3">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#F4C542] transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F4C542]/50 transition-all focus:bg-white/10 text-sm"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#F4C542] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-14 text-white placeholder-white/20 focus:outline-none focus:border-[#F4C542]/50 transition-all focus:bg-white/10 text-sm"
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={showPassword ? 'show' : 'hide'}
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.15 }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-xs font-bold uppercase tracking-wider text-center bg-red-400/10 py-3 rounded-lg overflow-hidden"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full bg-[#F4C542] text-black py-4 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(244,197,66,0.2)] hover:shadow-[0_0_30px_rgba(244,197,66,0.4)]"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="relative z-10 text-sm">Sign In</span>
                  <ChevronRight className="w-5 h-5 absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </>
              )}
            </button>
          </form>

          {/* Social Sign In Separator */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-white/20 text-[10px] font-bold uppercase tracking-widest">
              or sign in with
            </span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center py-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300"
            >
              <FaGoogle className="w-5 h-5 text-[#EA4335]" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center py-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300"
            >
              <FaFacebook className="w-5 h-5 text-[#1877F2]" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSocialLogin('apple')}
              className="flex items-center justify-center py-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300"
            >
              <FaApple className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          <div className="text-center pt-4 border-t border-white/5">
            <Link href="/register">
              <span className="text-xs text-white/40 hover:text-white transition-colors cursor-pointer font-medium">
                Don't have an account? <span className="text-[#F4C542]">Create one</span>
              </span>
            </Link>
          </div>
        </div>
      </FadeIn>

      <SocialSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        provider={selectedProvider}
        onSuccess={() => setLocation('/dashboard')}
      />

      {/* Glassmorphism Styles */}
      <style>{`
        .glass-panel-heavy {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
      `}</style>
    </div>
  );
}
