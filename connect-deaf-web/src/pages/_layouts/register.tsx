import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { RegisterStatus } from '@/components/register-status'

export function RegisterLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <RegisterStatus />

      <div className="w-auto">
        <Outlet />
      </div>
    </div>
  )
}
