import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import PassportPage from './components/PassportPage.jsx'
import ActionBar from './components/ActionBar.jsx'
import TopBar from './components/TopBar.jsx'
import { PanelIcon } from './components/icons.jsx'

export default function App() {
  const [dark, setDark] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])

  return (
    <div className={`app ${collapsed ? 'collapsed' : ''}`}>
      <Sidebar onCollapse={() => setCollapsed(true)} />
      <main className="stage">
        {collapsed && <button className="chip open" onClick={() => setCollapsed(false)} aria-label="Open sidebar"><PanelIcon /></button>}
        <TopBar dark={dark} onToggle={() => setDark(!dark)} />
        <PassportPage />
        <ActionBar />
      </main>
    </div>
  )
}
