import styles from './WorkFrame.module.css'
import type { WorkMeta } from '@/features/works-registry'

export function WorkFrame({ work }: { work: WorkMeta }) {
  // Embedded works are built into this same site, so BASE_URL (respecting
  // the gallery's own deploy base path, e.g. "/repo-name/" on a GitHub Pages
  // project site) resolves to /works/{slug}/. External works are hosted on
  // their own domain (e.g. a student's own GitHub Pages) — use that URL as-is.
  const src = work.hostingMode === 'external' ? work.externalUrl! : `${import.meta.env.BASE_URL}works/${work.slug}/`

  return (
    <div className={styles.wrapper}>
      <iframe className={styles.frame} src={src} title={work.title} allow="fullscreen; clipboard-write" />
      {work.hostingMode === 'external' && (
        <a className={styles.externalLink} href={work.externalUrl!} target="_blank" rel="noopener noreferrer">
          Buka di tab baru ↗
        </a>
      )}
    </div>
  )
}
