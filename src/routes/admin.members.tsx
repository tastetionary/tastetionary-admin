import { MembersTable } from '@/components/MembersTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/members')({
  component: MembersTable,
}) 