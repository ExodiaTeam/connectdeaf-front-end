import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex h-screen flex-col items-center">
      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  )
}
