import styles from './StarButton.module.css'
import { useStarRating } from '../hooks/useStarRating'

export function StarButton({ workId }: { workId: string }) {
  const { isStarred, starCount, toggle } = useStarRating(workId)

  return (
    <button
      type="button"
      className={styles.starButton}
      data-active={isStarred}
      aria-pressed={isStarred}
      onClick={() => void toggle()}
    >
      <span className={styles.icon}>{isStarred ? '⭐' : '☆'}</span>
      <span className={styles.count}>{starCount}</span>
    </button>
  )
}
