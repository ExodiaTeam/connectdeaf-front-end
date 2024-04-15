import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { Status } from '@/components/status'

export function RegisterLayout() {
  return (
    <div className="flex h-screen flex-col items-center">
      <Header />
      <Status />

      <div>
        <Outlet />
      </div>
    </div>
  )
}
