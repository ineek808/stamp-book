import { SunIcon, MoonIcon, GithubIcon } from './icons.jsx'

// Theme toggle + GitHub link, pinned to the top-right of the canvas.
export default function TopBar({ dark, onToggle }) {
  return (
    <div className="topbar">
      <button className="chip" onClick={onToggle} aria-label="Toggle theme">{dark ? <SunIcon /> : <MoonIcon />}</button>
      <a className="chip" href="https://github.com/ineek808" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
    </div>
  )
}
