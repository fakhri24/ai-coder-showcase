import { useCallback, useState } from 'react'
import { useAuth } from '@/features/auth'
import { postComment } from '../services/commentsService'

export function usePostComment(workId: string) {
  const { user } = useAuth()
  const [posting, setPosting] = useState(false)

  const post = useCallback(
    async (text: string) => {
      if (!user || !text.trim()) return
      setPosting(true)
      try {
        await postComment(
          workId,
          { uid: user.uid, name: user.displayName ?? 'Anonim', photoUrl: user.photoURL },
          text.trim(),
        )
      } finally {
        setPosting(false)
      }
    },
    [workId, user],
  )

  return { post, posting, canPost: !!user }
}
