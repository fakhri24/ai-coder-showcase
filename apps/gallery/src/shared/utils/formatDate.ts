import type { Timestamp } from 'firebase/firestore'

export function formatDate(timestamp: Timestamp | null | undefined): string {
  if (!timestamp) return ''

  return timestamp.toDate().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
