import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboard } from '@/components/AdminDashboard'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function ProtectedAdminDashboard() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboard />
    </ProtectedRoute>
  )
}

export const Route = createFileRoute('/admin/')({
  component: ProtectedAdminDashboard,
}) 