import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/button'
import { Fieldset } from '@/components/fieldset'
import { Input } from '@/components/input'

const signInFormSchema = z.object({
  email: z.string().email('Insira um email válido!'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres!'),
  remember: z.boolean().optional(),
})

type SignInFormInputs = z.infer<typeof signInFormSchema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>({ resolver: zodResolver(signInFormSchema) })

  async function handleSignIn(data: SignInFormInputs) {
    console.log(data)
  }

  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible)

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="py-10 text-2xl font-medium">Entrar</p>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex w-[644px] flex-col items-center"
      >
        <div className="flex w-full flex-col gap-5">
          <div>
            <Fieldset title="Email">
              <Input
                type="email"
                placeholder="seu@email.com"
                {...register('email', { required: true })}
              />
            </Fieldset>
            {errors.email && (
              <p className="mt-1 text-end text-sm text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <Fieldset title="Senha">
              <Input
                type={passwordVisible ? 'text' : 'password'}
                {...register('password', { required: true })}
              />
              <button
                className="ml-2 h-6 w-6 pb-2"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <Eye
                    size={20}
                    className="text-primary-500 hover:opacity-80"
                  />
                ) : (
                  <EyeSlash
                    size={20}
                    className="text-primary-500 hover:opacity-80"
                  />
                )}
              </button>
            </Fieldset>
            {errors.password && (
              <p className="mt-1 text-end text-sm text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-10 mt-2 flex w-full items-center justify-start gap-1 p-2">
          <input
            type="checkbox"
            id="remember"
            {...register('remember')}
            className="m-1 h-4 w-4 appearance-none rounded-sm border-2 border-disabled-700 checked:appearance-auto hover:opacity-80"
          />
          <label
            htmlFor="remember"
            className="text-disabled-700 hover:opacity-80"
          >
            Lembrar de mim
          </label>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          CONTINUAR
        </Button>
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
