import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sport } from '../types/match';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoveRight, ArrowLeft } from 'lucide-react';
import { MatchHistoryPanel } from '../components/MatchHistoryPanel';
import { FadeIn, MagneticButton } from '../components/MotionWrappers';

const scorevantFull = '/brand/logo-full.png';
const scorevantHorizontal = '/logo-horizontal.png';
const scorevantMark = '/brand/logomark.png';

const SPORTS: { id: Sport; name: string; color: string }[] = [
  { id: 'tennis', name: 'Tennis', color: '#F4C542' },
  { id: 'badminton', name: 'Badminton', color: '#F4C542' },
  { id: 'squash', name: 'Squash', color: '#F4C542' },
  { id: 'pickleball', name: 'Pickleball', color: '#F4C542' },
  { id: 'table-tennis', name: 'Table Tennis', color: '#F4C542' }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [sport, setSport] = useState<Sport>('tennis');
  const [p1, setP1] = useState('Player 1');
  const [p2, setP2] = useState('Player 2');
  const [bestOf, setBestOf] = useState<'3' | '5'>('3');

  // Parallax movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const activeColor = '#F4C542';
    document.documentElement.style.setProperty('--sport-accent', activeColor);
    document.documentElement.style.setProperty('--sport-accent-dim', `${activeColor}33`);
  }, [sport]);

  const handleStart = () => {
    sessionStorage.setItem('match_setup', JSON.stringify({ sport, player1: p1, player2: p2, bestOf: parseInt(bestOf) }));
    setLocation('/scoreboard');
  };

  const activeColor = '#F4C542';

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#F4C542]/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
        </motion.div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div style={{ x: useTransform(springX, v => v * -0.3), y: useTransform(springY, v => v * -0.3) }} className="absolute -left-20 -bottom-20 opacity-[0.02] scale-125 rotate-[-15deg]">
          <img 
            src={scorevantMark} 
            alt="" 
            className="w-[800px] h-auto grayscale mix-blend-screen" 
            style={{
              WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
              maskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 min-h-screen items-center">
        
        {/* Left: Setup Form */}
        <div className="w-full md:w-1/2 space-y-10">
          <FadeIn delay={0.1}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-[#F4C542] transition-colors text-xs font-bold uppercase tracking-widest mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Landing
            </Link>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Match Initialization
              </div>
              <h1 className="text-5xl font-black tracking-tighter leading-none">Setup Your <span style={{ color: activeColor }}>Match.</span></h1>
              <p className="text-white/40 text-sm font-medium">Configure match settings and player details to begin live scorekeeping.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black">Select Discipline</Label>
              <div className="flex flex-wrap gap-2">
                {SPORTS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSport(s.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                      sport === s.id 
                        ? 'bg-[#F4C542] text-black border-[#F4C542] shadow-[0_0_20px_rgba(244,197,66,0.3)]' 
                        : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <Card className="glass-panel-heavy border-white/5 overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Player One (A)</Label>
                    <Input 
                      value={p1} 
                      onChange={e => setP1(e.target.value)}
                      className="h-14 bg-white/5 border-white/5 focus-visible:ring-[#F4C542] text-lg font-bold rounded-xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Player Two (B)</Label>
                    <Input 
                      value={p2} 
                      onChange={e => setP2(e.target.value)}
                      className="h-14 bg-white/5 border-white/5 focus-visible:ring-[#F4C542] text-lg font-bold rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Match Format</Label>
                  <Select value={bestOf} onValueChange={(v: '3' | '5') => setBestOf(v)}>
                    <SelectTrigger className="h-14 bg-white/5 border-white/5 focus:ring-[#F4C542] rounded-xl text-sm font-bold">
                      <SelectValue placeholder="Best of 3" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white">
                      <SelectItem value="3">Best of 3 Sets</SelectItem>
                      <SelectItem value="5">Best of 5 Sets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <MagneticButton>
                  <Button 
                    onClick={handleStart}
                    className="w-full h-16 text-sm font-black uppercase tracking-[0.2em] bg-[#F4C542] text-black hover:bg-white transition-all duration-100 rounded-2xl shadow-xl"
                  >
                    Start Scoring Match
                    <MoveRight className="ml-3 w-5 h-5" />
                  </Button>
                </MagneticButton>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Right: History / Branding */}
        <FadeIn delay={0.4} direction="left" className="w-full md:w-1/2 flex flex-col gap-8">
          <div className="flex justify-center md:justify-end mb-4">
            <img 
              src={scorevantHorizontal} 
              alt="Scorevant" 
              className="h-20 w-auto object-contain mix-blend-screen opacity-80" 
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(244,197,66,0.3)) contrast(1.1) brightness(1.1)',
                WebkitMaskImage: 'radial-gradient(circle, black 80%, transparent 100%)',
                maskImage: 'radial-gradient(circle, black 80%, transparent 100%)'
              }}
            />
          </div>
          <div className="glass-panel-heavy rounded-[2rem] border border-white/5 p-2">
            <MatchHistoryPanel />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
