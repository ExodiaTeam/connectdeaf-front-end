import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form'
import { Eye, EyeSlash, Upload, User } from '@phosphor-icons/react';
import { useState } from 'react';
import { Avatar, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';

export const SignUpProfessional = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm()
  const areasAtuacao = ['Option 1', 'Option 2', 'Option 3']
  const qualificacao = ['Option 1', 'Option 2', 'Option 3']
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible)

  // ainda vou tipar essa imagem
  const handleDrop = (image: any) => {
    image.preventDefault()
    const files = image.dataTransfer.files
    if (files.length) {
      const file = files[0]
      setValue('image', file)
    }
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[644px] flex-col justify-center gap-6"
      >
        <div className="flex justify-center">
          <p className="text-2xl font-medium">Dados do prestador</p>
        </div>
        <div className="flex gap-x-5">
          <div className='flex items-center'>
            {
              imageFile === null ?
                <div className='h-20 w-20 flex items-center justify-center rounded-full bg-primary-100'>
                  <User size={32} />
                </div>
                :
                <div className='h-20 w-20 flex items-center justify-center rounded-full'>
                  <Avatar src={'https://avatars.githubusercontent.com/u/59853941?v=4'} alt="random" sx={{ width: 32, height: 32, borderRadius: 9999 }} />
                </div>
            }
          </div>
          <div
            className="flex w-full flex-col items-start justify-center space-y-4 border-[2px] border-dashed border-[rgba(169,169,169,0.5)] border-gray-400 p-4"
            onDrop={handleDrop}
          >
            <Upload size={32} />
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-base text-primary-500 underline"
              >
                Clique para exportar
              </label>
              <input
                id="file-upload"
                type="file"
                {...register('image', { required: false })}
                style={{ display: 'none' }}
                onChange={(e) => {
                  setValue('image', e.target.files ? [0] : undefined)
                  setImageFile(e.target.files ? e.target.files[0] : null);
                }}
              />
              <span> ou arraste uma foto</span>
            </div>
            <span className="text-sm opacity-40 ">PNG ou JPG (max. 3MB)</span>
          </div>
        </div>
        <div className="flex w-auto flex-col gap-3 ">
          <TextField
            label= 'Nome completo'
            placeholder='Nome completo'
            {...register('nome', { required: true })}
          />
          <TextField
            label= 'Email'
            placeholder='seu@email.com'
            {...register('email', { required: true })}
          />
          <div className="flex w-full space-x-4">
            <TextField
              label='Senha'
              placeholder='Senha'
              type={passwordVisible ? 'text' : 'password'}
              fullWidth
              {...register('password', { required: true })}
              InputProps={{
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
            <TextField
              label= 'Telefone'
              placeholder='(11) 11111-1111'
              fullWidth
              {...register('telefone', { required: true })}
            />
          </div>
          {/* FALTA ADICIONAR A VERIFICAÇÃO PARA NÃO DEIXAR O USUARIO MANDAR SEM SELECIOANR UMA OPÇÃO */}
          <div className="flex w-full space-x-4">
            <Controller
              name="areaAtuacao"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  select
                  label="Área de atuação"
                  placeholder="Área de atuação"
                  fullWidth
                  {...field}
                >
                  <MenuItem value="" disabled>
                    <em>Área de atuação</em>
                  </MenuItem>
                  {areasAtuacao.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="qualificacao"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  select
                  label="Qualificação"
                  placeholder="Qualificação"
                  fullWidth
                  {...field}
                >
                  <MenuItem value="" disabled>
                    <em>Qualificação</em>
                  </MenuItem>
                  {qualificacao.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
        </div>
        <Button 
          sx={{display: 'flex', height: '42px', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', backgroundColor: '#3D66CC', padding: '1rem', color: '#FFFFFF',  transitionDuration: '200ms', transitionTimingFunction: 'ease-in', '&:hover': { opacity: 0.9, }, '&:disabled': { backgroundColor: '#e0e0e0', }, marginBottom: '1.75rem'}} 
          type="submit" 
          variant="contained"> 
            CONTINUAR 
        </Button>
      </form>
    </div>
  )
}
