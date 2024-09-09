import './global.css'

import { RouterProvider } from 'react-router-dom'

import { router } from './pages/routes'
import { useEffect } from 'react';
import { setAuthStatus } from './redux/authSlice';
import { useDispatch } from 'react-redux';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          credentials: 'include',
        });
        const data = await response.json();
        dispatch(setAuthStatus(data.isLoggedIn));
      } catch (error) {
        console.error('Erro ao verificar o estado de autenticação:', error);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  return <RouterProvider router={router} />
}
