import { useCallback, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/shared/lib/firebase'
import { signInWithGoogle, useAuth } from '@/features/auth'
import { toggleStar } from '../services/starsService'

export function useStarRating(workId: string) {
  const { user } = useAuth()
  const [isStarred, setIsStarred] = useState(false)
  const [starCount, setStarCount] = useState(0)

  useEffect(() => {
    return onSnapshot(doc(db, 'works', workId), (snap) => {
      setStarCount((snap.data()?.starCount as number | undefined) ?? 0)
    })
  }, [workId])

  useEffect(() => {
    if (!user) {
      setIsStarred(false)
      return
    }
    return onSnapshot(doc(db, 'works', workId, 'stars', user.uid), (snap) => {
      setIsStarred(snap.exists())
    })
  }, [workId, user])

  const toggle = useCallback(async () => {
    if (!user) {
      await signInWithGoogle()
      return
    }

    const prevStarred = isStarred
    setIsStarred(!prevStarred)
    setStarCount((count) => count + (prevStarred ? -1 : 1))

    try {
      await toggleStar(workId, user.uid, prevStarred)
    } catch (error) {
      setIsStarred(prevStarred)
      setStarCount((count) => count - (prevStarred ? -1 : 1))
      throw error
    }
  }, [workId, user, isStarred])

  return { isStarred, starCount, toggle }
}
