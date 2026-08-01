import { doc, increment, runTransaction, serverTimestamp } from 'firebase/firestore'
import { db } from '@/shared/lib/firebase'

// Toggles a star via a transaction so the per-user star doc and the
// denormalized starCount on the work doc always move together.
export async function toggleStar(workId: string, uid: string, currentlyStarred: boolean): Promise<void> {
  const starRef = doc(db, 'works', workId, 'stars', uid)
  const workRef = doc(db, 'works', workId)

  await runTransaction(db, async (tx) => {
    const starSnap = await tx.get(starRef)

    if (currentlyStarred) {
      if (!starSnap.exists()) return // already unstarred elsewhere, no-op
      tx.delete(starRef)
      tx.update(workRef, { starCount: increment(-1) })
    } else {
      if (starSnap.exists()) return // already starred elsewhere, no-op
      tx.set(starRef, { uid, workId, createdAt: serverTimestamp() })
      tx.update(workRef, { starCount: increment(1) })
    }
  })
}
