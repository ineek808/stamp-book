// Shared data: icons, inks, starter places and stamp factory.
export const ICONS = {
  plane: { d: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z', fill: true },
  mountain: { d: 'M2 20 9 7l4 7 3-4 6 10z', fill: true },
  sun: { d: 'M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2', c: [12, 12, 4] },
  anchor: { d: 'M12 8v13M7 12h10M5 15c0 3 3 6 7 6s7-3 7-6', c: [12, 6, 2] },
  camera: { d: 'M3 7h4l2-3h6l2 3h4v13H3z', c: [12, 13.5, 3.5] },
  heart: { d: 'M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z', fill: true },
}
export const INKS = ['#1f3fa8', '#b3262e', '#5b2c8f', '#1e6b4a', '#1b1b1f', '#c2410c', '#0e7490', '#a21caf', '#854d0e']
export const PAPERS = ['#f3ead6', '#ffffff', '#e6eef7', '#e3cfae', '#f6e3e6']
export const SLOTS = [[240, 260], [570, 330], [330, 650], [590, 760], [230, 960], [560, 980]]
const PLACES = [['Paris', 'France', 'camera'], ['Reykjavik', 'Iceland', 'mountain'], ['Lisbon', 'Portugal', 'sun'], ['Mumbai', 'India', 'plane'], ['Hamburg', 'Germany', 'anchor'], ['Kyoto', 'Japan', 'heart']]
const pick = (a) => a[Math.floor(Math.random() * a.length)]
export const rand = (a, b) => a + Math.random() * (b - a)

export function makeStamp(over = {}) {
  const [city, country, icon] = pick(PLACES)
  return {
    id: crypto.randomUUID().slice(0, 8), city, country, icon,
    date: new Date().toISOString().slice(0, 10),
    shape: Math.random() > 0.5 ? 'circle' : 'rect', ink: pick(INKS), wear: 0.4,
    x: 400, y: 500, rot: Math.round(rand(-14, 14)), size: 1, delay: 0, ...over,
  }
}

export const SEED = [
  { id: 's1', city: 'Lisbon', country: 'Portugal', date: '2026-03-12', icon: 'sun', shape: 'circle', ink: '#1f3fa8', wear: 0.4, x: 240, y: 260, rot: -9, size: 1, delay: 200 },
  { id: 's2', city: 'Tokyo', country: 'Japan', date: '2026-05-02', icon: 'plane', shape: 'rect', ink: '#b3262e', wear: 0.4, x: 570, y: 330, rot: 7, size: 1, delay: 380 },
  { id: 's3', city: 'Cusco', country: 'Peru', date: '2026-07-21', icon: 'mountain', shape: 'circle', ink: '#1e6b4a', wear: 0.4, x: 330, y: 650, rot: 12, size: 1, delay: 560 },
]
