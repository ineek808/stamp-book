import { useState } from 'react'
import { useStore } from '../store/useStore.js'
import { ICONS, INKS, PAPERS } from './presets.js'
import { Icon } from './StampSvg.jsx'
import { PanelIcon } from './icons.jsx'

const TABS = ['Design', 'Text', 'Icons', 'Effects', 'Page']

function Seg({ value, options, onChange }) {
  return (
    <div className="seg" style={{ '--n': options.length, '--i': Math.max(0, options.findIndex((o) => o[0] === value)) }}>
      <span className="pill" />
      {options.map(([v, label]) => (
        <button key={v} aria-pressed={value === v} onClick={() => onChange(v)}>{label}</button>
      ))}
    </div>
  )
}

export default function Sidebar({ onCollapse }) {
  const [tab, setTab] = useState('Design')
  const { stamps, selectedId, update, remove, paper, pattern, setPaper, setPattern } = useStore()
  const s = stamps.find((x) => x.id === selectedId)
  const set = (k) => (e) => update({ [k]: e.target.value })
  const num = (k) => (e) => update({ [k]: +e.target.value })
  const wear = s ? (s.wear < 0.25 ? 'fresh' : s.wear < 0.55 ? 'worn' : 'faded') : 'worn'

  return (
    <aside className="side">
      <div className="head">
        <div className="brand"><i>SB</i><b>Stamp<span>Book</span></b></div>
        <button className="chip" onClick={onCollapse} aria-label="Collapse sidebar"><PanelIcon /></button>
      </div>

      <nav className="tabs">
        {TABS.map((t) => (
          <button key={t} aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>
        ))}
      </nav>

      <div className="body" key={tab}>
        {tab === 'Page' ? (
          <>
            <section>
              <h2>Paper colour</h2>
              <div className="dots">
                {PAPERS.map((c) => <button key={c} aria-label={c} aria-pressed={paper === c} style={{ background: c }} onClick={() => setPaper(c)} />)}
              </div>
            </section>
            <section>
              <h2>Page pattern</h2>
              <Seg value={pattern} onChange={setPattern} options={[['guilloche', 'Guilloche'], ['none', 'Plain']]} />
            </section>
          </>
        ) : !s ? (
          <p className="empty">Select a stamp on the page, or add a new one.</p>
        ) : tab === 'Design' ? (
          <>
            <section>
              <h2>Template &amp; format</h2>
              <div className="tiles">
                {[['circle', 'Circle'], ['rect', 'Rectangle']].map(([v, label]) => (
                  <button key={v} aria-pressed={s.shape === v} onClick={() => update({ shape: v })}>
                    <span className={`glyph ${v}`} />{label}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2>Preset colours</h2>
              <div className="dots">
                {INKS.map((c) => <button key={c} aria-label={c} aria-pressed={s.ink === c} style={{ background: c }} onClick={() => update({ ink: c })} />)}
                <label className="custom" aria-label="Custom colour"><input type="color" value={s.ink} onChange={set('ink')} /></label>
              </div>
            </section>
          </>
        ) : tab === 'Text' ? (
          <>
            <section>
              <h2>Place</h2>
              <input value={s.city} onChange={set('city')} placeholder="City" maxLength={18} aria-label="City" />
              <input value={s.country} onChange={set('country')} placeholder="Country" maxLength={20} aria-label="Country" />
            </section>
            <section>
              <h2>Date</h2>
              <input type="date" value={s.date} onChange={set('date')} aria-label="Date" />
            </section>
            <button className="danger" onClick={remove}>Delete this stamp</button>
          </>
        ) : tab === 'Icons' ? (
          <section>
            <h2>Stamp icon</h2>
            <div className="icons">
              {Object.keys(ICONS).map((k) => (
                <button key={k} aria-label={k} aria-pressed={s.icon === k} onClick={() => update({ icon: k })}>
                  <svg viewBox="0 0 24 24" width="26" height="26"><g transform="translate(12 12)"><Icon name={k} /></g></svg>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section>
              <h2>Ink wear</h2>
              <Seg value={wear} onChange={(v) => update({ wear: { fresh: 0.15, worn: 0.4, faded: 0.75 }[v] })} options={[['fresh', 'Fresh'], ['worn', 'Worn'], ['faded', 'Faded']]} />
            </section>
            <section>
              <h2>Tilt · {s.rot}°</h2>
              <input type="range" min="-30" max="30" value={s.rot} onChange={num('rot')} />
              <h2>Size · {Math.round(s.size * 100)}%</h2>
              <input type="range" min="0.6" max="1.5" step="0.05" value={s.size} onChange={num('size')} />
            </section>
          </>
        )}
      </div>

      <footer>
        <p>Built with <span className="heart">♥</span> by <b>Keenisha Joshi</b></p>
      </footer>
    </aside>
  )
}
