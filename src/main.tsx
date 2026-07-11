import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import { AuthProvider, useAuth } from './context/AuthContext.tsx'

function Root() {
  const { user, loading } = useAuth()
  if (loading) return null

  const storageKey = `quotdesign:${user?.uid ?? 'guest'}`
  const defaultDesigner = { name: user?.displayName ?? '', email: user?.email ?? '', phone: '' }

  return (
    <AppProvider key={storageKey} storageKey={storageKey} defaultDesigner={defaultDesigner}>
      <App />
    </AppProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
