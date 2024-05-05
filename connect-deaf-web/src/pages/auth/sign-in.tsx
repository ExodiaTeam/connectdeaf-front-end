import { Envelope, Eye, EyeSlash, Lock } from '@phosphor-icons/react'
import { useState } from 'react'

import { Button } from '@/components/button'
import { Fieldset } from '@/components/fieldset'
import { Input } from '@/components/input'

export function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible)

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="py-10 text-2xl font-medium">Entrar</p>
      <form action="" className="flex w-[644px] flex-col items-center">
        <div className="flex w-full flex-col gap-5">
          <Fieldset title="Email">
            <Input type="text" placeholder="seu@email.com">
              {/* <Envelope weight="fill" size={24} /> */}
            </Input>
          </Fieldset>
          <Fieldset title="Senha">
            <Input type={passwordVisible ? 'text' : 'password'}>
              {/* <Lock weight="fill" size={24} /> */}
            </Input>
            <button
              className="ml-2 h-6 w-6 pb-2"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <Eye size={20} className="text-primary-500 hover:opacity-80" />
              ) : (
                <EyeSlash
                  size={20}
                  className="text-primary-500 hover:opacity-80"
                />
              )}
            </button>
          </Fieldset>
        </div>
        <div className="mb-10 mt-2 flex w-full items-center justify-start gap-1 p-2">
          <input
            type="checkbox"
            name=""
            id="remember"
            className="m-1 h-4 w-4 appearance-none rounded-sm border-2 border-disabled-700 checked:appearance-auto hover:opacity-80"
          />
          <label
            htmlFor="remember"
            className="text-disabled-700 hover:opacity-80"
          >
            Lembrar de mim
          </label>
        </div>
        <Button type="submit">CONTINUAR</Button>
        <a
          className="pt-4 text-primary-500 underline hover:opacity-80"
          href="#"
        >
          Esqueci minha senha
        </a>
      </form>
    </div>
  )
}
