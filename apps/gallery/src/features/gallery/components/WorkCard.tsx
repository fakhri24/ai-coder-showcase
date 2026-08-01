import { Link } from 'react-router-dom'
import styles from './WorkCard.module.css'
import type { WorkDoc } from '../types'

export function WorkCard({ work }: { work: WorkDoc }) {
  return (
    <Link to={`/work/${work.slug}`} className={styles.card}>
      <img className={styles.thumbnail} src={work.thumbnailPath} alt={work.title} loading="lazy" />
      <div className={styles.body}>
        <h3 className={styles.title}>{work.title}</h3>
        <p className={styles.description}>{work.description}</p>
        <div className={styles.meta}>
          <span className={styles.stars}>⭐ {work.starCount}</span>
          <span className={styles.category}>{work.category}</span>
        </div>
      </div>
    </Link>
  )
}
