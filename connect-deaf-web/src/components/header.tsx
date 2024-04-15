import { MagnifyingGlass } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo-branco-amarelo.svg'

export function Header() {
  return (
    <header className="bg-primary-500 flex w-full items-center justify-between px-[4.5rem] py-6">
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
        <Link className="text-white transition-opacity hover:opacity-80" to="/">
          SERVIÇOS
        </Link>
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
      </nav>
    </header>
  )
}
