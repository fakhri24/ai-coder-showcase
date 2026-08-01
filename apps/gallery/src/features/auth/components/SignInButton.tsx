import styles from './SignInButton.module.css'
import { signInWithGoogle } from '../services/authService'

export function SignInButton() {
  return (
    <button type="button" className={styles.signInButton} onClick={() => void signInWithGoogle()}>
      Masuk dengan Google
    </button>
  )
}
