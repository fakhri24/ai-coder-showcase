import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/shared/lib/firebase'
import { worksRegistry } from '@/features/works-registry'
import type { WorkDoc } from '../types'

// The registry (git) is the source of truth for which works exist; Firestore
// only supplies the mutable starCount, merged in here per work.
export function useWorksList() {
  const [starCounts, setStarCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onSnapshot(
      collection(db, 'works'),
      (snapshot) => {
        const next: Record<string, number> = {}
        snapshot.forEach((docSnap) => {
          next[docSnap.id] = (docSnap.data().starCount as number | undefined) ?? 0
        })
        setStarCounts(next)
        setLoading(false)
      },
      (error) => {
        // Firestore unreachable/misconfigured — still show the registry
        // (with starCount 0) instead of spinning forever.
        console.error('Gagal memuat star count:', error)
        setLoading(false)
      },
    )
  }, [])

  const works: WorkDoc[] = worksRegistry.map((work) => ({
    ...work,
    starCount: starCounts[work.slug] ?? 0,
  }))

  return { works, loading }
}
