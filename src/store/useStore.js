import { create } from 'zustand'
import { SEED, SLOTS, PAPERS, makeStamp, rand } from '../components/presets.js'

export const useStore = create((set, get) => ({
  stamps: SEED,
  selectedId: 's1',
  paper: PAPERS[0],
  pattern: 'guilloche',
  add: () => {
    const [x, y] = SLOTS[get().stamps.length % SLOTS.length]
    const s = makeStamp({ x: x + rand(-30, 30), y: y + rand(-30, 30) })
    set({ stamps: [...get().stamps, s], selectedId: s.id })
  },
  update: (p) => set((st) => ({ stamps: st.stamps.map((s) => (s.id === st.selectedId ? { ...s, ...p } : s)) })),
  move: (id, x, y) => set((st) => ({ stamps: st.stamps.map((s) => (s.id === id ? { ...s, x, y } : s)) })),
  select: (id) => set({ selectedId: id }),
  remove: () => set((st) => ({ stamps: st.stamps.filter((s) => s.id !== st.selectedId), selectedId: null })),
  reset: () => set({ stamps: SEED.map((s) => ({ ...s })), selectedId: 's1', paper: PAPERS[0], pattern: 'guilloche' }),
  setPaper: (paper) => set({ paper }),
  setPattern: (pattern) => set({ pattern }),
}))
