import { useReducer, useCallback } from 'react';
import { MatchState, Sport } from '../types/match';
import { scorePoint } from '../lib/scoring';

type MatchAction = 
  | { type: 'START_MATCH'; payload: { sport: Sport, player1: string, player2: string, bestOf: 3 | 5 } }
  | { type: 'SCORE_POINT'; payload: 1 | 2 }
  | { type: 'UNDO' }
  | { type: 'END_MATCH' };

const initialState: MatchState = {
  sport: 'tennis',
  player1: 'Player 1',
  player2: 'Player 2',
  format: { bestOf: 3 },
  sets: [],
  currentGame: { p1Points: 0, p2Points: 0, server: 1 },
  p1Sets: 0,
  p2Sets: 0,
  status: 'setup',
  winner: null,
  history: []
};

function matchReducer(state: MatchState, action: MatchAction): MatchState {
  switch (action.type) {
    case 'START_MATCH':
      return {
        ...initialState,
        sport: action.payload.sport,
        player1: action.payload.player1,
        player2: action.payload.player2,
        format: { bestOf: action.payload.bestOf },
        status: 'playing'
      };

    case 'SCORE_POINT': {
      if (state.status !== 'playing') return state;

      const scorer = action.payload;
      const historyEntry = {
        currentGame: { ...state.currentGame },
        sets: [...state.sets],
        p1Sets: state.p1Sets,
        p2Sets: state.p2Sets
      };

      const result = scorePoint(
        state.sport,
        state.currentGame.p1Points,
        state.currentGame.p2Points,
        scorer,
        state.currentGame.server,
        state.p1Sets,
        state.p2Sets,
        state.format.bestOf
      );

      let newState = {
        ...state,
        currentGame: {
          p1Points: result.p1Points,
          p2Points: result.p2Points,
          server: result.server
        },
        history: [...state.history, historyEntry]
      };

      if (result.gameWon) {
        // Record completed set
        newState.sets = [...state.sets, { p1: result.p1Points, p2: result.p2Points }];
        
        if (result.gameWon === 1) newState.p1Sets += 1;
        else newState.p2Sets += 1;

        newState.currentGame = { p1Points: 0, p2Points: 0, server: result.server };

        const setsNeeded = Math.ceil(state.format.bestOf / 2);
        if (newState.p1Sets >= setsNeeded || newState.p2Sets >= setsNeeded) {
          newState.status = 'finished';
          newState.winner = newState.p1Sets >= setsNeeded ? 1 : 2;
        }
      }

      return newState;
    }

    case 'UNDO': {
      if (state.history.length === 0) return state;
      const lastState = state.history[state.history.length - 1];
      return {
        ...state,
        currentGame: lastState.currentGame,
        sets: lastState.sets,
        p1Sets: lastState.p1Sets,
        p2Sets: lastState.p2Sets,
        status: 'playing',
        winner: null,
        history: state.history.slice(0, -1)
      };
    }

    case 'END_MATCH':
      return { ...state, status: 'finished' };

    default:
      return state;
  }
}

export function useMatchState() {
  const [state, dispatch] = useReducer(matchReducer, initialState);

  const startMatch = useCallback((payload: { sport: Sport, player1: string, player2: string, bestOf: 3 | 5 }) => {
    dispatch({ type: 'START_MATCH', payload });
  }, []);

  const scoreP1 = useCallback(() => dispatch({ type: 'SCORE_POINT', payload: 1 }), []);
  const scoreP2 = useCallback(() => dispatch({ type: 'SCORE_POINT', payload: 2 }), []);
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);

  return { state, startMatch, scoreP1, scoreP2, undo };
}
