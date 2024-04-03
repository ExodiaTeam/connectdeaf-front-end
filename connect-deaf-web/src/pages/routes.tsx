import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/_layouts/app'
import { AuthLayout } from '@/_layouts/auth'

import { Home } from './app/home'
import { SignIn } from './auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Home /> }],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
