import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './_layouts/app'
import { RegisterLayout } from './_layouts/register'
import { Home } from './app/home'
import { SignIn } from './auth/sign-in'
import { SignUp } from './auth/sign-up'
import { SignUpClient } from './auth/sign-up-client'
import { SignUpProfessional } from './auth/sign-up-professional'
import { ListServices } from './app/list-services'
import { SignUpAddress } from './auth/sign-up-address'
import { SignUpFinishing } from './auth/sign-up-finishing'
import { Service } from './app/service'
import { ProfileProfessional } from './app/profile-professional'
import { ProfileClient } from './app/profile-client.tsx'
import { Appointments } from './app/appointments'
import ProtectedRoute from './protectedRoute'
import { AppointmentsProfessional } from './app/appointments-professional.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/services', element: <ListServices /> },
      { path: '/service', element: <Service /> },
      { path: '/myprofile/professional/:id', element: <ProtectedRoute />, children: [
        { path: '', element: <ProfileProfessional /> },
      ]},
      { path: '/myprofile/client/:id', element: <ProtectedRoute />, children: [
        { path: '', element: <ProfileClient /> },
      ]},
      { path: '/appointments', element: <ProtectedRoute />, children: [
        { path: '', element: <Appointments /> },
      ]},
      { path: '/appointments/professional/:id', element: <ProtectedRoute />, children: [
        { path: '', element: <AppointmentsProfessional /> },
      ]},
    ],
  },

  {
    path: '/',
    element: <RegisterLayout />,
    children: [
      { path: '/sign-up', element: <SignUp /> },
      { path: '/sign-up/client', element: <SignUpClient /> },
      { path: '/sign-up/professional', element: <SignUpProfessional /> },
      { path: '/sign-up/address', element: <SignUpAddress /> },
      { path: '/sign-up/finishing', element: <SignUpFinishing /> },
    ],
  },
])