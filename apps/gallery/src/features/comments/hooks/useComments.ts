import { useEffect, useState } from 'react'
import { subscribeToComments } from '../services/commentsService'
import type { Comment } from '../types'

export function useComments(workId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    return subscribeToComments(
      workId,
      (next) => {
        setComments(next)
        setLoading(false)
      },
      (error) => {
        console.error('Gagal memuat komentar:', error)
        setLoading(false)
      },
    )
  }, [workId])

  return { comments, loading }
}
