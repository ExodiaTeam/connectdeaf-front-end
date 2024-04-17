import { useLocation } from 'react-router-dom'

import { Divider } from './divider'
import { Status } from './status'

export function RegisterStatus() {
  const { pathname } = useLocation()

  return (
    <div className="pt-18 flex flex-col items-center gap-8 pb-10">
      <h2 className="text-2xl font-medium">Cadastro</h2>
      {pathname === '/sign-up' && (
        <div className="flex items-center justify-center gap-2">
          <Status step={1} name="Tipo" status="active" />
          <Divider />
          <Status step={2} name="Seus Dados" status="disabled" />
          <Divider />
          <Status step={3} name="Endereço" status="disabled" />
          <Divider />
          <Status step={4} name="Finalizando" status="disabled" />
        </div>
      )}
      {(pathname === '/sign-up/client' ||
        pathname === '/sign-up/professional') && (
        <div className="flex items-center justify-center gap-2">
          <Status step={1} name="Tipo" status="completed" />
          <Divider />
          <Status step={2} name="Seus Dados" status="active" />
          <Divider />
          <Status step={3} name="Endereço" status="disabled" />
          <Divider />
          <Status step={4} name="Finalizando" status="disabled" />
        </div>
      )}
      {pathname === '/sign-up/address' && (
        <div className="flex items-center justify-center gap-2">
          <Status step={1} name="Tipo" status="completed" />
          <Divider />
          <Status step={2} name="Seus Dados" status="completed" />
          <Divider />
          <Status step={3} name="Endereço" status="active" />
          <Divider />
          <Status step={4} name="Finalizando" status="disabled" />
        </div>
      )}
      {pathname === '/sign-up/finishing' && (
        <div className="flex items-center justify-center gap-2">
          <Status step={1} name="Tipo" status="completed" />
          <Divider />
          <Status step={2} name="Seus Dados" status="completed" />
          <Divider />
          <Status step={3} name="Endereço" status="completed" />
          <Divider />
          <Status step={4} name="Finalizando" status="active" />
        </div>
      )}
    </div>
  )
}
