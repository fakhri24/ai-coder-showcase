import { Link } from 'react-router-dom'
import styles from './WorkHeader.module.css'
import { StarButton } from '@/features/star-rating'
import type { WorkMeta } from '@/features/works-registry'

export function WorkHeader({ work }: { work: WorkMeta }) {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.backLink}>
        ← Kembali ke galeri
      </Link>
      <div className={styles.row}>
        <div>
          <h1 className={styles.title}>{work.title}</h1>
          <p className={styles.authors}>oleh {work.authorNames.join(', ')}</p>
        </div>
        <StarButton workId={work.slug} />
      </div>
    </header>
  )
}
