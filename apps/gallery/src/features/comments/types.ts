import type { Timestamp } from 'firebase/firestore'

export interface Comment {
  id: string
  authorUid: string
  authorName: string
  authorPhotoUrl: string | null
  text: string
  createdAt: Timestamp | null
}
