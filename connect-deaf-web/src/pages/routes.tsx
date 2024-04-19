import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './_layouts/app'
import { RegisterLayout } from './_layouts/register'
import { Home } from './app/home'
import { SignIn } from './auth/sign-in'
import { SignUp } from './auth/sign-up'
import { SignupClient } from './auth/sign-upClient'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sign-in', element: <SignIn /> },
    ],
  },

  {
    path: '/',
    element: <RegisterLayout />,
    children: [
      { path: '/sign-up', element: <SignUp /> },
      { path: '/sign-up/client', element: <SignupClient /> },
      { path: '/sign-up/professional', element: <SignUp /> },
      { path: '/sign-up/address', element: <SignUp /> },
      { path: '/sign-up/finishing', element: <SignUp /> },
    ],
  },
])