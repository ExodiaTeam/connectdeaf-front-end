import './global.css'

import { RouterProvider } from 'react-router-dom'

import { router } from './pages/routes'
import { useEffect } from 'react';
import { login } from './redux/authSlice';
import { useDispatch } from 'react-redux';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      if (token) {
        dispatch(login({ token, expiresIn: parseInt(tokenExpiry || '0', 10) }));
      } else {
        
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  return <RouterProvider router={router} />
}
