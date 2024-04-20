import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { RegisterStatus } from '@/components/register-status'

export function RegisterLayout() {
  return (
    <div className="flex h-screen flex-col items-center">
      <Header />
      <RegisterStatus />

      <div className='w-auto'>
        <Outlet />
      </div>
    </div>
  )
}
