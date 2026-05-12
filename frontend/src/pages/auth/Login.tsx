import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FadeIn } from '../../components/MotionWrappers';
import { Mail, Lock, Loader2, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#F4C542]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <FadeIn className="relative z-10 w-full max-w-md">
        <div className="glass-panel-heavy p-10 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl bg-black/60 space-y-8">
          
          <div className="text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-16 h-16 bg-[#F4C542]/10 rounded-2xl border border-[#F4C542]/20 mx-auto flex items-center justify-center mb-6"
            >
              <Lock className="w-8 h-8 text-[#F4C542]" />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tighter">Welcome Back.</h1>
            <p className="text-white/40 text-sm font-medium">
              Access your officiating dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#F4C542] transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#F4C542]/50 transition-all focus:bg-white/10"
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-14 text-white placeholder-white/20 focus:outline-none focus:border-[#F4C542]/50 transition-all focus:bg-white/10"
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
                  <span className="relative z-10">Sign In</span>
                  <ChevronRight className="w-5 h-5 absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-white/5">
            <Link href="/register">
              <span className="text-sm text-white/40 hover:text-white transition-colors cursor-pointer font-medium">
                Don't have an account? <span className="text-[#F4C542]">Create one</span>
              </span>
            </Link>
          </div>
        </div>
      </FadeIn>

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
