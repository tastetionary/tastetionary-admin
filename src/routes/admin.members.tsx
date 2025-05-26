import { createFileRoute } from '@tanstack/react-router'
import { MembersTable } from '@/components/MembersTable'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function ProtectedMembersTable() {
  return (
    <ProtectedRoute requireAdmin>
      <MembersTable />
    </ProtectedRoute>
  )
}

export const Route = createFileRoute('/admin/members')({
  component: ProtectedMembersTable,
}) 