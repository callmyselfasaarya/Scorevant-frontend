import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Trophy, ChevronRight, Activity } from 'lucide-react';
import { useMatchHistory } from '../hooks/useMatchHistory';
import { FadeIn } from '../components/MotionWrappers';

const scorevantMark = '/brand/logomark.png';

export default function HistoryPage() {
  const { matches, clearHistory } = useMatchHistory();

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#F4C542]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <header className="mb-16 space-y-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/30 hover:text-[#F4C542] transition-colors text-xs font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <h1 className="text-6xl font-black tracking-tighter">Match <span className="text-white/40">Archive.</span></h1>
              <p className="text-white/40 text-sm font-medium">Review past performances and competitive statistics.</p>
            </div>
            {matches.length > 0 && (
              <button 
                onClick={clearHistory}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all text-[10px] font-black uppercase tracking-widest"
              >
                Clear All Logs
              </button>
            )}
          </div>
        </header>

        {matches.length === 0 ? (
          <FadeIn className="flex flex-col items-center justify-center py-40 space-y-6 opacity-40">
            <Clock className="w-20 h-20 text-white/10" />
            <p className="text-xl font-bold tracking-tight">No match history found.</p>
            <Link href="/setup">
              <button className="px-8 py-4 rounded-full bg-[#F4C542] text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
                Start Your First Match
              </button>
            </Link>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {matches.map((match, idx) => (
              <FadeIn key={match.id} delay={idx * 0.05} className="group relative glass-panel-heavy p-8 rounded-[2rem] border-white/5 hover:border-[#F4C542]/30 transition-all duration-500">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                  {/* Sport & Date */}
                  <div className="flex flex-col items-center md:items-start gap-3">
                    <div className="px-4 py-1.5 rounded-full bg-[#F4C542]/10 border border-[#F4C542]/20 text-[9px] font-black uppercase tracking-[0.2em] text-[#F4C542]">
                      {match.sport}
                    </div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                      {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Players & Score */}
                  <div className="flex-1 flex items-center justify-center gap-12">
                    <div className="text-right space-y-1">
                      <div className={`text-2xl font-black tracking-tighter ${match.winner === 1 ? 'text-white' : 'text-white/40'}`}>
                        {match.player1}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">Player One</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-black tracking-tighter text-[#F4C542] w-12 text-center">{match.p1Sets}</div>
                      <div className="h-8 w-[1px] bg-white/10" />
                      <div className="text-4xl font-black tracking-tighter text-[#F4C542] w-12 text-center">{match.p2Sets}</div>
                    </div>

                    <div className="text-left space-y-1">
                      <div className={`text-2xl font-black tracking-tighter ${match.winner === 2 ? 'text-white' : 'text-white/40'}`}>
                        {match.player2}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">Player Two</div>
                    </div>
                  </div>

                  {/* Sets Breakdown */}
                  <div className="flex gap-2">
                    {match.sets.map((set, i) => (
                      <div key={i} className="flex flex-col items-center bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <span className="text-[10px] font-black text-white/80">{set.p1}</span>
                        <div className="w-4 h-[1px] bg-white/10 my-1" />
                        <span className="text-[10px] font-black text-white/80">{set.p2}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trophy Indicator */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-black border border-[#F4C542]/20 flex items-center justify-center text-[#F4C542] shadow-xl group-hover:scale-110 transition-transform">
                  <Trophy className="w-5 h-5" />
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* Decorative Mark */}
      <div className="fixed -bottom-40 -left-40 opacity-[0.03] pointer-events-none -rotate-12 scale-150">
        <img src={scorevantMark} alt="" className="w-[800px] grayscale mix-blend-screen" />
      </div>
    </div>
  );
}
