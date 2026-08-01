export type HostingMode = 'embedded' | 'external'

export interface WorkMeta {
  slug: string
  title: string
  description: string
  authorNames: string[]
  category: 'game' | 'tool' | 'other'
  thumbnailPath: string
  // 'embedded': source lives in works/{slug}/ and is built into this site
  //   at /works/{slug}/.
  // 'external': the work is deployed on its own (e.g. the student's own
  //   GitHub Pages); works/{slug}/ only needs a thumbnail file, no source.
  hostingMode: HostingMode
  externalUrl: string | null
}
