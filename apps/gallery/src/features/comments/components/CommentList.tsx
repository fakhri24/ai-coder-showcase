import styles from './CommentList.module.css'
import { CommentItem } from './CommentItem'
import type { Comment } from '../types'

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className={styles.empty}>Belum ada komentar. Jadilah yang pertama!</p>
  }

  return (
    <ul className={styles.list}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  )
}
