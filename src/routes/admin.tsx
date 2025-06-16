import { createFileRoute, Outlet } from '@tanstack/react-router'

function AdminLayout() {
  return <Outlet />
}

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})
