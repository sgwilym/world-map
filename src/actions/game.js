// Game specific state
export const SUBSCENE_SEEN = 'SUBSCENE_SEEN';
export const RESET_SEEN_SUBSCENES = 'RESET_SEEN_SUBSCENES';

export function seenSubscene(sceneSubsceneIndex) {
  return { type: SUBSCENE_SEEN, sceneSubsceneIndex };
}

export function resetSeenSubscenes() {
  return { type: RESET_SEEN_SUBSCENES };
}
