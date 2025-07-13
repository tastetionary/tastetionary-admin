import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Members } from '@/components/members'

function ProtectedMembersTable() {
  return (
    <ProtectedRoute requireAdmin>
      <Members />
    </ProtectedRoute>
  )
}

export const Route = createFileRoute('/admin/members')({
  component: ProtectedMembersTable,
})
