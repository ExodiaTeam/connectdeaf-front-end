import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeSimple, Eye, EyeSlash, Lock } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { login } from '@/redux/authSlice'

const signInFormSchema = z.object({
  email: z.string().email('Insira um email válido!'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres!'),
  remember: z.boolean().optional(),
})

type SignInFormInputs = z.infer<typeof signInFormSchema>

export function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>({ resolver: zodResolver(signInFormSchema) })

  async function handleSignIn(data: SignInFormInputs) {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Erro ao fazer login';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      const token = result.accessToken;
      const expiresIn = result.expiresIn;

      dispatch(login({ token, expiresIn }));

      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);

      const typeUser = JSON.parse(decodedPayload).roles[0];


      if (typeUser === 'ROLE_USER') {
        navigate('/services')
      } else {
        const userId = JSON.parse(decodedPayload).professionalId;
        navigate('/appointments/professional/' + userId);
      }

    } catch (error) {
      console.error('Erro ao fazer login:', error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro desconhecido ao fazer login');
      }
    }
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
            <TextField
              label="Email"
              placeholder='seu@email.com'
              fullWidth
              {...register('email', { required: true })}
              InputProps={{
                startAdornment: (
                  <EnvelopeSimple size={32} color="#999999" weight="thin" style={{ marginRight: '8px' }} />
                )
              }}
            />
            {errors.email && (
              <p className="mt-1 text-end text-sm text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <TextField
              label='Senha'
              placeholder='Senha'
              type={passwordVisible ? 'text' : 'password'}
              fullWidth
              {...register('password', { required: true })}
              InputProps={{
                startAdornment: (
                  <Lock size={32} color="#999999" weight="thin" style={{ marginRight: '8px' }} />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {passwordVisible ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
        {errorMessage && (
          <p className="mt-1 text-end text-sm text-red-500">
            {errorMessage}
          </p>
        )}
        <Button
          sx={{ display: 'flex', height: '42px', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', backgroundColor: '#3D66CC', padding: '1rem', color: '#FFFFFF', transitionDuration: '200ms', transitionTimingFunction: 'ease-in', '&:hover': { opacity: 0.9, }, '&:disabled': { backgroundColor: '#e0e0e0', }, marginBottom: '1.75rem' }}
          type="submit"
          disabled={isSubmitting}
          variant="contained">
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