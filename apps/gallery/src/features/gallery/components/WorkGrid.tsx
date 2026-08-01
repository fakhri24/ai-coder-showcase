import styles from './WorkGrid.module.css'
import { WorkCard } from './WorkCard'
import type { WorkDoc } from '../types'

export function WorkGrid({ works }: { works: WorkDoc[] }) {
  if (works.length === 0) {
    return <p className={styles.empty}>Belum ada karya yang ditampilkan.</p>
  }

  return (
    <div className={styles.grid}>
      {works.map((work) => (
        <WorkCard key={work.slug} work={work} />
      ))}
    </div>
  )
}
