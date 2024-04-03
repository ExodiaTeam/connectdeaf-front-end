import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1>Header</h1>
      <h1>Status</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
