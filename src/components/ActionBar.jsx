import { useStore } from '../store/useStore.js'
import { ResetIcon, UploadIcon, PlusIcon } from './icons.jsx'

function exportPng() {
  const svg = document.getElementById('passport-svg').cloneNode(true)
  svg.querySelectorAll('[data-ui]').forEach((n) => n.remove())
  svg.querySelectorAll('.slam').forEach((n) => n.removeAttribute('class'))
  svg.setAttribute('width', 1600)
  svg.setAttribute('height', 2200)
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml;charset=utf-8' }))
  const img = new Image()
  img.onload = () => {
    const c = document.createElement('canvas')
    c.width = 1600
    c.height = 2200
    c.getContext('2d').drawImage(img, 0, 0, 1600, 2200)
    c.toBlob((b) => {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(b)
      a.download = 'passport-page.png'
      a.click()
    })
    URL.revokeObjectURL(url)
  }
  img.src = url
}

export default function ActionBar() {
  const { add, reset, stamps } = useStore()
  return (
    <div className="actions">
      <button className="pbtn light" onClick={reset}><ResetIcon />Reset</button>
      <button className="pbtn light" onClick={add}><PlusIcon />Stamp</button>
      <button className="pbtn dark" onClick={exportPng} disabled={!stamps.length}><UploadIcon />Export</button>
    </div>
  )
}
