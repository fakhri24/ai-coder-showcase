import styles from './UserMenu.module.css'
import { useAuth } from '../hooks/useAuth'
import { signOut } from '../services/authService'

export function UserMenu() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className={styles.userMenu}>
      {user.photoURL && (
        <img className={styles.avatar} src={user.photoURL} alt={user.displayName ?? 'Pengguna'} />
      )}
      <span className={styles.name}>{user.displayName}</span>
      <button type="button" className={styles.signOutButton} onClick={() => void signOut()}>
        Keluar
      </button>
    </div>
  )
}
