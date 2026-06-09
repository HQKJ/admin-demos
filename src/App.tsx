import { Bell, ChevronRight, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router'
import { demoRoutes, legacyRouteRedirects } from './demoRegistry'

function AppShell() {
  const [navOpen, setNavOpen] = useState(false)
  const location = useLocation()
  const currentRoute =
    demoRoutes.find((route) => route.path === location.pathname) ?? demoRoutes[0]
  const groupedRoutes = demoRoutes.reduce<Record<string, typeof demoRoutes>>((groups, route) => {
    groups[route.group] = [...(groups[route.group] ?? []), route]
    return groups
  }, {})

  return (
    <div className="app-shell">
      <aside className={`sidebar ${navOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">D</div>
          <div>
            <strong>DTC Admin</strong>
            <span>Prototype Demos</span>
          </div>
        </div>

        <nav className="nav-groups">
          {Object.entries(groupedRoutes).map(([group, routes]) => (
            <div className="nav-group" key={group}>
              <span>{group}</span>
              {routes.map((route) => {
                const Icon = route.icon
                return (
                  <NavLink
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    end={route.path === '/'}
                    key={route.path}
                    onClick={() => setNavOpen(false)}
                    to={route.path}
                  >
                    <Icon size={18} />
                    {route.title}
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button
            className="icon-button mobile-only"
            onClick={() => setNavOpen((open) => !open)}
            title={navOpen ? '关闭导航' : '打开导航'}
            type="button"
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="breadcrumb">
            <span>DTC 运营管理</span>
            <ChevronRight size={15} />
            <strong>{currentRoute.title}</strong>
          </div>
          <div className="topbar-tools">
            <label className="global-search">
              <Search size={17} />
              <input placeholder="搜索订单、SKU、客户" />
            </label>
            <button className="icon-button" title="通知" type="button">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            {demoRoutes.map((route) => {
              const Demo = route.component
              return <Route element={<Demo />} key={route.path} path={route.path} />
            })}
            {legacyRouteRedirects.map((path) => (
              <Route element={<Navigate replace to="/" />} key={path} path={path} />
            ))}
            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return <AppShell />
}
