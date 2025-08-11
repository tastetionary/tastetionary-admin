import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Reviews } from '@/components/reviews'

function ProtectedReviewsTable() {
  return (
    <ProtectedRoute requireAdmin>
      <Reviews />
    </ProtectedRoute>
  )
}

export const Route = createFileRoute('/admin/reviews')({
  component: ProtectedReviewsTable,
})
