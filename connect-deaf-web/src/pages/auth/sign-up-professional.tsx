import Button from '@mui/material/Button';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeSlash, Upload, User } from '@phosphor-icons/react';
import { useState } from 'react';
import { Avatar, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setProfessionalData } from '@/redux/formSlice';
import { useDispatch } from 'react-redux';

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  areaOfExpertise: string;
  qualification: string;
  image?: File | null;
  workStartTime: string;
  workEndTime: string;
  breakDuration: string;
}

export const SignUpProfessional = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const areasAtuacao = ['Option 1', 'Option 2', 'Option 3'];
  const qualificacao = ['Option 1', 'Option 2', 'Option 3'];
  const intervalos = ['15 minutos', 'PT30M', '45 minutos', '1 hora'];
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formattedPhone, setFormattedPhone] = useState(''); 

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/\D/g, '');
    if (onlyNums.length <= 11) {
      return onlyNums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNums = value.replace(/\D/g, ''); 

    if (onlyNums.length <= 11) {
      setFormattedPhone(formatPhoneNumber(value)); 
      setValue('phoneNumber', onlyNums); 
      if (onlyNums.length === 11) {
        clearErrors('phoneNumber');
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      setValue('image', file);
      setImageFile(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('teste onSubmit professional', data)
    if (data.phoneNumber.length !== 11) {
      setError('phoneNumber', {
        type: 'manual',
        message: 'O número de telefone deve ter 11 dígitos',
      });
      return;
    }
    dispatch(setProfessionalData(data));
    navigate('/sign-up/address');
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-3/6 flex-col justify-center gap-6"
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
                  <Avatar src={URL.createObjectURL(imageFile)} alt="Avatar" sx={{ width: 32, height: 32, borderRadius: 9999 }} />
                </div>
            }
          </div>
          <div
            className="flex w-full flex-col items-start justify-center space-y-4 border-[2px] border-dashed border-[rgba(169,169,169,0.5)] border-gray-400 p-4"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
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
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  setValue('image', file);
                  setImageFile(file);
                }}
              />
              <span> ou arraste uma foto</span>
            </div>
            <span className="text-sm opacity-40 ">PNG ou JPG (max. 3MB)</span>
          </div>
        </div>
        <div className="flex w-auto flex-col gap-3 ">
          <TextField
            label='Nome completo'
            placeholder='Nome completo'
            {...register('name', { required: 'Nome é obrigatório' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label='Email'
            placeholder='seu@email.com'
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Email inválido',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <div className="flex w-full space-x-4">
            <TextField
              label='Senha'
              placeholder='Senha'
              type={passwordVisible ? 'text' : 'password'}
              fullWidth
              {...register('password', { required: 'Senha é obrigatória' })}
              error={!!errors.password}
              helperText={errors.password?.message}
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
              label='Telefone'
              placeholder='(11) 11111-1111'
              fullWidth
              value={formattedPhone}
              onChange={handlePhoneNumberChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </div>
          <div className="flex w-full space-x-4">
            <Controller
              name="areaOfExpertise"
              control={control}
              defaultValue=""
              rules={{ required: 'Área de atuação é obrigatória' }}
              render={({ field }) => (
                <TextField
                  select
                  label="Área de atuação"
                  placeholder="Área de atuação"
                  fullWidth
                  {...field}
                  error={!!errors.areaOfExpertise}
                  helperText={errors.areaOfExpertise?.message}
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
              name="qualification"
              control={control}
              defaultValue=""
              rules={{ required: 'Qualificação é obrigatória' }}
              render={({ field }) => (
                <TextField
                  select
                  label="Qualificação"
                  placeholder="Qualificação"
                  fullWidth
                  {...field}
                  error={!!errors.qualification}
                  helperText={errors.qualification?.message}
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
          <div className="flex w-full space-x-4">
            <TextField
              label='Horário de início'
              type='time'
              fullWidth
              inputProps={{ step: 1 }}
              {...register('workStartTime', { required: 'Horário de início é obrigatório' })}
              error={!!errors.workStartTime}
              helperText={errors.workStartTime?.message}
            />
            <TextField
              label='Horário de término'
              type='time'
              fullWidth
              inputProps={{ step: 1 }}
              {...register('workEndTime', { required: 'Horário de término é obrigatório' })}
              error={!!errors.workEndTime}
              helperText={errors.workEndTime?.message}
            />
          </div>
          <Controller
            name="breakDuration"
            control={control}
            defaultValue=""
            rules={{ required: 'Intervalo entre serviços é obrigatório' }}
            render={({ field }) => (
              <TextField
                select
                label="Intervalo entre serviços"
                placeholder="Intervalo entre serviços"
                fullWidth
                {...field}
                error={!!errors.breakDuration}
                helperText={errors.breakDuration?.message}
              >
                <MenuItem value="" disabled>
                  <em>Intervalo entre serviços</em>
                </MenuItem>
                {intervalos.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        <Button
          sx={{
            display: 'flex',
            height: '42px',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.375rem',
            backgroundColor: '#3D66CC',
            padding: '1rem',
            color: '#FFFFFF',
            transitionDuration: '200ms',
            transitionTimingFunction: 'ease-in',
            '&:hover': { opacity: 0.9 },
            '&:disabled': { backgroundColor: '#e0e0e0' },
            marginBottom: '1.75rem',
          }}
          type='submit'
          variant="contained"
        >
          CONTINUAR
        </Button>
      </form>
    </div>
  );
};