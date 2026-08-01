import styles from './GalleryPage.module.css'
import { WorkGrid } from '../components/WorkGrid'
import { useWorksList } from '../hooks/useWorksList'
import { Spinner } from '@/shared/components/Spinner'

export function GalleryPage() {
  const { works, loading } = useWorksList()

  return (
    <section className={styles.page}>
      <h1 className={styles.heading}>Karya Ekskul AI Coder</h1>
      <p className={styles.subheading}>Coba langsung karya-karya di bawah ini — tidak perlu login.</p>
      {loading ? <Spinner /> : <WorkGrid works={works} />}
    </section>
  )
}
