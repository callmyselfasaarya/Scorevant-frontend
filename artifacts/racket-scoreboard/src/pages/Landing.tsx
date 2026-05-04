import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Menu, X, ChevronRight, Play } from 'lucide-react';

const scorevantHorizontal = '/logo-horizontal.png';

const NAV_LINKS = ['Home', 'Matches', 'Sports', 'Leaderboard', 'About'];

const SCORE_TICKS = [
  { p1: 15, p2: 18 },
  { p1: 15, p2: 19 },
  { p1: 16, p2: 19 },
  { p1: 17, p2: 19 },
  { p1: 17, p2: 20 },
  { p1: 18, p2: 20 },
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scoreIdx, setScoreIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setScoreIdx(i => (i + 1) % SCORE_TICKS.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const score = SCORE_TICKS[scoreIdx];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">

      {/* === ANIMATED CINEMATIC BACKGROUND === */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary gradient layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(242,201,76,0.12),transparent)]" />
        {/* Drifting glow orbs */}
        <div className="orb orb-1 absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(242,201,76,0.09)_0%,transparent_70%)]" />
        <div className="orb orb-2 absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
        <div className="orb orb-3 absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(242,201,76,0.05)_0%,transparent_70%)]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(242,201,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,201,76,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* === NAVBAR === */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <img
            src={scorevantHorizontal}
            alt="Scorevant"
            className="h-8 w-auto object-contain cursor-pointer"
            style={{ filter: 'drop-shadow(0 0 10px rgba(242,201,76,0.5))' }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-medium transition-colors duration-200 ${
                i === 0
                  ? 'text-[#F2C94C]'
                  : 'text-white/50 hover:text-white/90'
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLocation('/setup')}
            className="liquid-glass px-5 py-2 rounded-full text-sm font-semibold text-white/90 hover:text-white hover:scale-105 transition-all duration-200"
            data-testid="nav-start-match"
          >
            Start Match
          </button>
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            data-testid="menu-toggle"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 px-6 pb-4 flex flex-col gap-3 md:hidden"
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`text-sm font-medium py-1.5 border-b border-white/5 ${
                i === 0 ? 'text-[#F2C94C]' : 'text-white/60'
              }`}
            >
              {link}
            </a>
          ))}
        </motion.div>
      )}

      {/* === HERO SECTION === */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-40 min-h-[calc(100vh-80px)]">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-[#F2C94C] mb-8 inline-flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2C94C] animate-pulse" />
          Live Scorekeeping for Racket Sports
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-display tracking-tight leading-[0.9] max-w-5xl"
        >
          Where every{' '}
          <span className="text-[#F2C94C] relative inline-block">
            rally
            <span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F2C94C]"
              style={{ filter: 'blur(1px)' }}
            />
          </span>{' '}
          becomes a{' '}
          <span className="text-white/90">story.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="text-white/55 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-sans"
        >
          Track every point, every serve, and every victory in real-time.
          Scorevant brings modern, lightning-fast scorekeeping to badminton,
          tennis, table tennis, squash, and pickleball.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          <button
            onClick={() => setLocation('/setup')}
            data-testid="hero-start-match"
            className="group liquid-glass px-12 py-5 rounded-full text-lg font-bold text-white hover:scale-105 transition-all duration-200 flex items-center gap-3 border border-[#F2C94C]/25 hover:border-[#F2C94C]/50"
            style={{ boxShadow: '0 0 40px rgba(242,201,76,0.12)' }}
          >
            Start Live Match
            <ChevronRight className="w-5 h-5 text-[#F2C94C] group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="flex items-center gap-2.5 text-white/50 hover:text-white/80 transition-colors text-sm font-medium px-4 py-3"
            data-testid="hero-watch-demo"
          >
            <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </span>
            Watch Demo
          </button>
        </motion.div>

        {/* Sport pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-14"
        >
          {[
            { name: 'Tennis', color: '#c8ff00' },
            { name: 'Badminton', color: '#00e5ff' },
            { name: 'Squash', color: '#ff6b35' },
            { name: 'Pickleball', color: '#ffe135' },
            { name: 'Table Tennis', color: '#ff2d78' },
          ].map(sport => (
            <span
              key={sport.name}
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{
                background: `${sport.color}14`,
                color: sport.color,
                border: `1px solid ${sport.color}30`,
              }}
            >
              {sport.name}
            </span>
          ))}
        </motion.div>
      </div>

      {/* === FLOATING MINI SCOREBOARD === */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="fixed bottom-8 right-6 z-30 hidden md:block"
      >
        <div
          className="liquid-glass rounded-2xl px-5 py-4 min-w-[180px] border border-white/10"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(242,201,76,0.06)' }}
        >
          <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2C94C] animate-pulse" />
            Live
          </div>
          <div className="space-y-2">
            <div className={`flex items-center justify-between gap-6 ${score.p2 > score.p1 ? 'opacity-50' : ''}`}>
              <span className="text-xs font-semibold text-white/80 font-sans">Player A</span>
              <motion.span
                key={`p1-${score.p1}`}
                initial={{ scale: 1.4, color: '#F2C94C' }}
                animate={{ scale: 1, color: score.p1 >= score.p2 ? '#F2C94C' : '#ffffff99' }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-display leading-none"
              >
                {score.p1}
              </motion.span>
            </div>
            <div className={`flex items-center justify-between gap-6 ${score.p1 > score.p2 ? 'opacity-50' : ''}`}>
              <span className="text-xs font-semibold text-white/80 font-sans">Player B</span>
              <motion.span
                key={`p2-${score.p2}`}
                initial={{ scale: 1.4, color: '#F2C94C' }}
                animate={{ scale: 1, color: score.p2 >= score.p1 ? '#F2C94C' : '#ffffff99' }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-display leading-none"
              >
                {score.p2}
              </motion.span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-white/30 font-sans">
            Badminton · Game 2
          </div>
        </div>
      </motion.div>

    </div>
  );
}
