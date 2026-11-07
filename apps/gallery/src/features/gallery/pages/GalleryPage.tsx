import { useMemo } from 'react'
import styles from './GalleryPage.module.css'
import { WorkGrid } from '../components/WorkGrid'
import { WorkCard } from '../components/WorkCard'
import { useWorksList } from '../hooks/useWorksList'
import { Spinner } from '@/shared/components/Spinner'
import type { WorkDoc } from '../types'

export function GalleryPage() {
  const { works, loading } = useWorksList()

  // Select 4 random work slugs once when the list of slugs in works is available
  const slugsKey = works.map((w) => w.slug).join(',')
  const randomSlugs = useMemo(() => {
    if (works.length === 0) return []
    const slugs = works.map((w) => w.slug)
    const shuffled = [...slugs]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, 4)
    // Recompute only if the set of registered works changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugsKey])

  const { randomWorks, remainingWorks } = useMemo(() => {
    const randomSet = new Set(randomSlugs)
    const workBySlug = new Map(works.map((w) => [w.slug, w]))

    const random = randomSlugs
      .map((slug) => workBySlug.get(slug))
      .filter((w): w is WorkDoc => Boolean(w))

    // Remaining works sorted from newest to oldest (reversed order from registry)
    const remaining = [...works].reverse().filter((w) => !randomSet.has(w.slug))

    return { randomWorks: random, remainingWorks: remaining }
  }, [works, randomSlugs])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Karya Ekskul AI Coder</h1>
        <p className={styles.subheading}>Coba langsung karya-karya di bawah ini — tidak perlu login.</p>
      </header>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {randomWorks.length > 0 && (
            <section className={styles.section} aria-label="Karya Pilihan Acak">
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>🎲</span> Karya Pilihan Acak
                </h2>
                <span className={styles.sectionBadge}>Sorotan</span>
              </div>
              <div className={styles.featuredGrid}>
                {randomWorks.map((work) => (
                  <WorkCard key={work.slug} work={work} />
                ))}
              </div>
            </section>
          )}

          <section className={styles.section} aria-label="Karya Terbaru">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>✨</span> Karya Terbaru
              </h2>
              <span className={styles.countBadge}>{remainingWorks.length} karya</span>
            </div>
            <WorkGrid works={remainingWorks} />
          </section>
        </>
      )}
    </div>
  )
}

