export const initialState = { hunger: 76, mood: 88, energy: 64, coins: 128, name: '桃桃' };
export function applyAction(state, action) {
  const next = { ...state };
  if (action === 'feed' && next.coins >= 5) { next.hunger = Math.min(100, next.hunger + 14); next.mood = Math.min(100, next.mood + 3); next.coins -= 5; }
  if (action === 'play') { next.mood = Math.min(100, next.mood + 12); next.energy = Math.max(0, next.energy - 8); }
  if (action === 'sleep') next.energy = Math.min(100, next.energy + 18);
  return next;
}
