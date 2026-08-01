import styles from './CommentSection.module.css'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'
import { useComments } from '../hooks/useComments'
import { Spinner } from '@/shared/components/Spinner'

export function CommentSection({ workId }: { workId: string }) {
  const { comments, loading } = useComments(workId)

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Komentar</h2>
      <CommentForm workId={workId} />
      {loading ? <Spinner /> : <CommentList comments={comments} />}
    </section>
  )
}
