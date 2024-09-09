import { Bell, Envelope, MagnifyingGlass, UserCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/index'
import logo from '../assets/logo-branco-amarelo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authSlice';

export function Header() {
  //const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isLoggedIn = true;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex w-full items-center justify-between bg-primary-500 px-[4.5rem] py-6">
      <Link to="/">
        <img src={logo} alt="Logo CENOPS UFC" />
      </Link>
      <div className="flex w-[25.5rem] gap-2 rounded-md bg-white px-3 py-2">
        <MagnifyingGlass size={24} className="text-primary-500" />
        <input
          type="text"
          placeholder="Pesquisar por serviço, prestador..."
          className="w-full bg-transparent outline-none"
        />
      </div>
      <nav className="flex items-center justify-between gap-6">
        <Link className="text-white transition-opacity hover:opacity-80" to="/services">
          SERVIÇOS
        </Link>
        
        { 
          isLoggedIn ?
            <div className='flex gap-4 items-center'>
              <Bell size={24} color="#ffffff" weight="fill" />
              <Envelope size={24} color="#ffffff" />
              <UserCircle size={32} color="#ffffff" weight="fill" />
            </div>
          :
            <div>
              <Link
              className="font-bold text-white transition-opacity hover:opacity-80"
              to="/sign-up"
              >
                CADASTRAR
              </Link>
              <Link
                className="text-white transition-opacity hover:opacity-80"
                to="/sign-in"
              >
                ENTRAR
              </Link> 
            </div>
        }
      </nav>
    </header>
  )
}
