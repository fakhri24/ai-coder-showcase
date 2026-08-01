import { signInWithPopup, signInWithRedirect, signOut as firebaseSignOut } from 'firebase/auth'
import { auth, googleProvider } from '@/shared/lib/firebase'

export async function signInWithGoogle(): Promise<void> {
  try {
    await signInWithPopup(auth, googleProvider)
  } catch (error) {
    // Some browsers (in-app webviews like Instagram/LINE) block popups outright.
    // Fall back to a full-page redirect in that specific case only.
    const code = (error as { code?: string }).code
    if (code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, googleProvider)
      return
    }
    throw error
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth)
}
