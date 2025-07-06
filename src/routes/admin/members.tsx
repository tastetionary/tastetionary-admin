import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Members } from '@/components/members'

function ProtectedMembers() {
  return (
    <ProtectedRoute requireAdmin>
      <Members />
    </ProtectedRoute>
  )
}

export const Route = createFileRoute('/admin/members')({
  component: ProtectedMembers,
})
