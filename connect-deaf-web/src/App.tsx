import './global.css'
import '@radix-ui/themes/styles.css';

import { RouterProvider } from 'react-router-dom'

import { router } from './pages/routes'

export function App() {
  return <RouterProvider router={router} />
}
