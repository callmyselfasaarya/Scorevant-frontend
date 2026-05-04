import { format } from 'date-fns';
import { Trophy, Calendar } from 'lucide-react';
import { useMatchHistory } from '../hooks/useMatchHistory';
import { Button } from '@/components/ui/button';

export function MatchHistoryPanel() {
  const { history, clearHistory } = useMatchHistory();

  if (history.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <Trophy className="w-12 h-12 mx-auto opacity-20 mb-4" />
        <p>No completed matches yet.</p>
        <p className="text-sm">Play a match and it will show up here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="font-display tracking-widest text-lg text-white/80 uppercase">Match History</h3>
        <Button variant="ghost" size="sm" onClick={clearHistory} className="text-destructive/80 hover:text-destructive hover:bg-destructive/10">
          Clear
        </Button>
      </div>
      
      <div className="space-y-3">
        {history.map((match) => (
          <div key={match.id} className="glass-panel p-4 rounded-2xl flex items-center justify-between border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-white/50 uppercase tracking-widest font-bold">
                <span className="text-[var(--sport-accent)]">{match.sport.replace('-', ' ')}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(match.date), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex flex-col text-sm font-medium">
                <div className={`flex justify-between w-48 ${match.winner === 1 ? 'text-white' : 'text-white/50'}`}>
                  <span>{match.player1} {match.winner === 1 && '🏆'}</span>
                  <span className="font-display text-lg">{match.p1Sets}</span>
                </div>
                <div className={`flex justify-between w-48 ${match.winner === 2 ? 'text-white' : 'text-white/50'}`}>
                  <span>{match.player2} {match.winner === 2 && '🏆'}</span>
                  <span className="font-display text-lg">{match.p2Sets}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              {match.sets.map((set, i) => (
                <div key={i} className="flex flex-col items-center text-xs font-display text-white/40">
                  <span className={match.winner === 1 ? 'text-white/80' : ''}>{set.p1}</span>
                  <span className="w-3 h-[1px] bg-white/10 my-1" />
                  <span className={match.winner === 2 ? 'text-white/80' : ''}>{set.p2}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
