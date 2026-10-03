import { ICONS } from './presets.js'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
export const fmtDate = (d) => {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return `${+day} ${MONTHS[m - 1]} ${y}`
}
const DISPLAY = "Impact,'Arial Narrow Bold','Helvetica Neue',sans-serif"
const MONO = "'Courier New',monospace"

export function Icon({ name, scale = 1 }) {
  const ic = ICONS[name]
  return (
    <g transform={`scale(${scale}) translate(-12 -12)`} fill={ic.fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={ic.fill ? 0 : 1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d={ic.d} />
      {ic.c && <circle cx={ic.c[0]} cy={ic.c[1]} r={ic.c[2]} />}
    </g>
  )
}

// One ink stamp, centred on (0,0). Ink texture = noise-masked alpha + slight displacement.
export default function Stamp({ s, index = 0 }) {
  const city = (s.city || '').toUpperCase()
  const country = (s.country || '').toUpperCase()
  const date = fmtDate(s.date)
  const seed = s.id.charCodeAt(0) + s.id.charCodeAt(1)
  const ring = { fill: 'none', stroke: 'currentColor' }
  const circle = s.shape === 'circle'
  const fs = circle ? Math.max(11, Math.min(24, 190 / (Math.max(city.length, 1) * 0.68))) : Math.max(14, Math.min(34, 150 / (Math.max(city.length, 1) * 0.55)))
  return (
    <g transform={`translate(${s.x} ${s.y}) rotate(${s.rot}) scale(${s.size})`}>
      <defs>
        <filter id={`ink-${s.id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed} result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale={2 + (s.wear ?? 0.4) * 6} result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed + 7} result="n" />
          <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -${(0.55 + (s.wear ?? 0.4) * 0.6).toFixed(2)}`} result="m" />
          <feComposite in="d" in2="m" operator="in" />
        </filter>
        <path id={`t-${s.id}`} d="M-70 0A70 70 0 0 1 70 0" fill="none" />
        <path id={`b-${s.id}`} d="M-82 0A82 82 0 0 0 82 0" fill="none" />
      </defs>
      <g className="slam" style={{ color: s.ink, animationDelay: `${s.delay}ms` }} filter={`url(#ink-${s.id})`} opacity="0.92">
        {circle ? (
          <>
            <circle r="100" {...ring} strokeWidth="5" />
            <circle r="91" {...ring} strokeWidth="1.5" />
            <circle r="60" {...ring} strokeWidth="1.5" />
            <circle cx="-76" r="2.6" fill="currentColor" />
            <circle cx="76" r="2.6" fill="currentColor" />
            <text fontFamily={DISPLAY} fontSize={fs} textAnchor="middle" letterSpacing="2" fill="currentColor">
              <textPath href={`#t-${s.id}`} startOffset="50%">{city}</textPath>
            </text>
            <text fontFamily={DISPLAY} fontSize="16" textAnchor="middle" letterSpacing="3" fill="currentColor">
              <textPath href={`#b-${s.id}`} startOffset="50%">{country}</textPath>
            </text>
            <g transform="translate(0 -10)"><Icon name={s.icon} scale={1.9} /></g>
            <text y="36" fontFamily={MONO} fontWeight="700" fontSize="13" textAnchor="middle" fill="currentColor">{date}</text>
          </>
        ) : (
          <>
            <rect x="-120" y="-70" width="240" height="140" rx="8" {...ring} strokeWidth="5" />
            <rect x="-111" y="-61" width="222" height="122" rx="3" {...ring} strokeWidth="1.5" />
            <path d="M-50 -61V61M-40 6H102" {...ring} strokeWidth="1.5" />
            <g transform="translate(-80 0)"><Icon name={s.icon} scale={2.3} /></g>
            <text x="32" y="-42" fontFamily={MONO} fontWeight="700" fontSize="10" textAnchor="middle" letterSpacing="5" fill="currentColor">ENTRY</text>
            <text x="32" y="-8" fontFamily={DISPLAY} fontSize={fs} textAnchor="middle" fill="currentColor">{city}</text>
            <text x="32" y="26" fontFamily={DISPLAY} fontSize="14" textAnchor="middle" letterSpacing="3" fill="currentColor">{country}</text>
            <text x="32" y="48" fontFamily={MONO} fontWeight="700" fontSize="14" textAnchor="middle" fill="currentColor">{date}</text>
          </>
        )}
      </g>
    </g>
  )
}
