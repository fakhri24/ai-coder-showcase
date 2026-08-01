import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/shared/lib/firebase'
import type { Comment } from '../types'

export function subscribeToComments(
  workId: string,
  onChange: (comments: Comment[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const commentsQuery = query(collection(db, 'works', workId, 'comments'), orderBy('createdAt', 'desc'))

  return onSnapshot(
    commentsQuery,
    (snapshot) => {
      onChange(
        snapshot.docs.map((docSnap) => {
          const data = docSnap.data()
          return {
            id: docSnap.id,
            authorUid: data.authorUid as string,
            authorName: data.authorName as string,
            authorPhotoUrl: (data.authorPhotoUrl as string | null) ?? null,
            text: data.text as string,
            createdAt: (data.createdAt as Comment['createdAt']) ?? null,
          }
        }),
      )
    },
    onError,
  )
}

export async function postComment(
  workId: string,
  author: { uid: string; name: string; photoUrl: string | null },
  text: string,
): Promise<void> {
  await addDoc(collection(db, 'works', workId, 'comments'), {
    authorUid: author.uid,
    authorName: author.name,
    authorPhotoUrl: author.photoUrl,
    text,
    createdAt: serverTimestamp(),
  })
}
