import { HashRouter } from 'react-router-dom'
import styles from './App.module.css'
import { AuthProvider } from './providers/AuthProvider'
import { AppRoutes } from './routes'
import { SignInButton, UserMenu, useAuth } from '@/features/auth'

function TopBar() {
  const { user, loading } = useAuth()

  return (
    <header className={styles.topBar}>
      <span className={styles.brand}>AI Coder Showcase</span>
      {!loading && (user ? <UserMenu /> : <SignInButton />)}
    </header>
  )
}

export function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <TopBar />
        <main>
          <AppRoutes />
        </main>
      </HashRouter>
    </AuthProvider>
  )
}
