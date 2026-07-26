import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, applyAction } from '../src/state.js';

test('feeding costs coins and restores hunger', () => {
  const result = applyAction(initialState, 'feed');
  assert.equal(result.coins, 123);
  assert.equal(result.hunger, 90);
  assert.equal(initialState.coins, 128);
});
test('stats stay within their allowed range', () => {
  assert.equal(applyAction({ ...initialState, mood: 96 }, 'play').mood, 100);
  assert.equal(applyAction({ ...initialState, energy: 95 }, 'sleep').energy, 100);
});
test('feeding is blocked without enough coins', () => {
  const state = { ...initialState, coins: 3 };
  assert.deepEqual(applyAction(state, 'feed'), state);
});
