import type { WorkMeta } from './types'
import rawWorks from './works.json'

interface WorkEntry {
  slug: string
  title: string
  description: string
  authorNames: string[]
  category: WorkMeta['category']
  thumbnailFile: string
  hostingMode: WorkMeta['hostingMode']
  externalUrl: string | null
}

// works.json is the source of truth for which works exist and get built
// into the site — it's also read directly (as plain JSON, no Vite-specific
// syntax) by scripts/build-all.mjs and scripts/validate-works-registry.mjs,
// so this file stays the only place doing Vite-aware enrichment (BASE_URL).
// After adding an entry there: scaffold the folder with
// `npm run new-work -- <slug>` and create the matching `works/{slug}`
// Firestore doc (see CONTRIBUTING.md).
export const worksRegistry: WorkMeta[] = (rawWorks as WorkEntry[]).map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  description: entry.description,
  authorNames: entry.authorNames,
  category: entry.category,
  thumbnailPath: `${import.meta.env.BASE_URL}works/${entry.slug}/${entry.thumbnailFile}`,
  hostingMode: entry.hostingMode,
  externalUrl: entry.externalUrl,
}))
