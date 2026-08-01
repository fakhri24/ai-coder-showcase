import type { Timestamp } from 'firebase/firestore'

// Schema for works/{workId}/stars/{uid} — doc ID is the user's uid, which
// structurally guarantees "one star per user per work" and makes "did the
// current user star this" a single getDoc/onSnapshot by ID.
export interface StarDoc {
  uid: string
  workId: string
  createdAt: Timestamp
}
