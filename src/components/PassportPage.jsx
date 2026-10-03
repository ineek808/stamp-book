import { useRef } from 'react'
import { useStore } from '../store/useStore.js'
import Stamp from './StampSvg.jsx'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export default function PassportPage() {
  const { stamps, selectedId, select, move, paper, pattern } = useStore()
  const ref = useRef(null)
  const drag = useRef(null)

  const toSvg = (e) => {
    const p = ref.current.createSVGPoint()
    p.x = e.clientX
    p.y = e.clientY
    return p.matrixTransform(ref.current.getScreenCTM().inverse())
  }
  const down = (e, s) => {
    e.stopPropagation()
    select(s.id)
    const p = toSvg(e)
    drag.current = { id: s.id, dx: s.x - p.x, dy: s.y - p.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const moveEv = (e) => {
    if (!drag.current) return
    const p = toSvg(e)
    move(drag.current.id, clamp(p.x + drag.current.dx, 40, 760), clamp(p.y + drag.current.dy, 40, 1060))
  }
  const sel = stamps.find((s) => s.id === selectedId)

  return (
    <svg
      id="passport-svg" ref={ref} className="page" viewBox="0 0 800 1100" xmlns="http://www.w3.org/2000/svg"
      onPointerMove={moveEv} onPointerUp={() => (drag.current = null)} onPointerDown={() => select(null)}
    >
      <defs>
        <pattern id="guil" width="60" height="60" patternUnits="userSpaceOnUse">
          {[[30, 30], [0, 0], [60, 0], [0, 60], [60, 60]].map(([x, y]) => (
            <circle key={x + '-' + y} cx={x} cy={y} r="28" fill="none" stroke="#b8a77c" strokeWidth=".6" opacity=".4" />
          ))}
        </pattern>
      </defs>
      <rect width="800" height="1100" rx="14" fill={paper} />
      {pattern === 'guilloche' && <rect width="800" height="1100" rx="14" fill="url(#guil)" />}
      <rect x="22" y="22" width="756" height="1056" rx="6" fill="none" stroke="#c9b98f" strokeWidth="2" />
      <text x="400" y="1062" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="16" fill="#9c8d68">14</text>
      {stamps.map((s) => (
        <g key={s.id} className="stamp" onPointerDown={(e) => down(e, s)}>
          <Stamp s={s} />
        </g>
      ))}
      {sel && (
        <g data-ui="1" pointerEvents="none" transform={`translate(${sel.x} ${sel.y}) rotate(${sel.rot})`}>
          <rect
            x={-(sel.shape === 'circle' ? 108 : 128) * sel.size} y={-(sel.shape === 'circle' ? 108 : 78) * sel.size}
            width={(sel.shape === 'circle' ? 216 : 256) * sel.size} height={(sel.shape === 'circle' ? 216 : 156) * sel.size}
            rx="10" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6"
          />
        </g>
      )}
    </svg>
  )
}
