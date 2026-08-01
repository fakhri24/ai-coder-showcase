import { useMemo } from 'react'
import { worksRegistry } from '@/features/works-registry'

export function useWorkBySlug(slug: string | undefined) {
  return useMemo(() => worksRegistry.find((work) => work.slug === slug), [slug])
}
