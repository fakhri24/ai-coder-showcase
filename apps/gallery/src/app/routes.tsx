import { Route, Routes } from 'react-router-dom'
import { GalleryPage } from '@/features/gallery'
import { WorkDetailPage } from '@/features/work-viewer'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GalleryPage />} />
      <Route path="/work/:slug" element={<WorkDetailPage />} />
    </Routes>
  )
}
