import styles from './CommentItem.module.css'
import { formatDate } from '@/shared/utils/formatDate'
import type { Comment } from '../types'

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <li className={styles.item}>
      {comment.authorPhotoUrl && (
        <img className={styles.avatar} src={comment.authorPhotoUrl} alt={comment.authorName} />
      )}
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.author}>{comment.authorName}</span>
          <span className={styles.date}>{formatDate(comment.createdAt)}</span>
        </div>
        <p className={styles.text}>{comment.text}</p>
      </div>
    </li>
  )
}
