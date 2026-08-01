import { useParams } from 'react-router-dom'
import styles from './WorkDetailPage.module.css'
import { WorkFrame } from '../components/WorkFrame'
import { WorkHeader } from '../components/WorkHeader'
import { useWorkBySlug } from '../hooks/useWorkBySlug'
import { CommentSection } from '@/features/comments'

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const work = useWorkBySlug(slug)

  if (!work) {
    return <p className={styles.notFound}>Karya tidak ditemukan.</p>
  }

  return (
    <section className={styles.page}>
      <WorkHeader work={work} />
      <WorkFrame work={work} />
      <div className={styles.commentsWrap}>
        <CommentSection workId={work.slug} />
      </div>
    </section>
  )
}
