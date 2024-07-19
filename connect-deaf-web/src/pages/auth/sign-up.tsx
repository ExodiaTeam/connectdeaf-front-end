import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

import clientImg from '../../assets/cliente.svg'
import professionalImg from '../../assets/profissional.svg'
import { useForm } from 'react-hook-form';

interface UserRegistrationType {
  type: 'client' | 'professional'
}

export function SignUp() {
  const [selectedType, setselectedType] = useState('');

  const {
    register,
    handleSubmit,
    setValue
  } = useForm<UserRegistrationType>();

  const handleTypeClick = (type: 'client' | 'professional') => {
    setValue('type', type);
    setselectedType(type);
  };

  const navigate = useNavigate()

  function handleUserRegistrationType(data: UserRegistrationType) {
    navigate(`/sign-up/${data.type}`)
  }

  return (
    <div className="flex flex-col items-center">
      <form
      onSubmit={handleSubmit(handleUserRegistrationType)}
        className="flex h-full max-w-xl flex-col items-center gap-6 px-3"
      >
        <p className="text-xl font-medium">Você é um...</p>

        <div style={{display: 'flex', flexDirection: 'row', gap: '40px'}}>
            <Box
              component="img"
              src={clientImg}
              alt='Client'
              sx={{
                width: '256px',
                height: '256px',
                border: selectedType === 'client' ? '2px solid #59B3FF' : '2px solid #999999',
                borderRadius: '6px',
                cursor: 'pointer',
                background:  selectedType === 'client' ? '#EEF7FF' : '',

              }}
              {...register('type', { required: false })}
              onClick={() => handleTypeClick('client')}
            />
            <Box
              component="img"
              src={professionalImg}
              alt='Professional'
              sx={{
                width: '256px',
                height: '256px',
                border: selectedType === 'professional' ? '2px solid #59B3FF' : '2px solid #999999',
                borderRadius: '6px',
                cursor: 'pointer',
                background:  selectedType === 'professional' ? '#EEF7FF' : '',
              }}
              {...register('type', { required: false })}
              onClick={() => handleTypeClick('professional')}
            />
        </div>
        <Button 
          sx={{display: 'flex', height: '42px', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', backgroundColor: '#3D66CC', padding: '1rem', color: '#FFFFFF',  transitionDuration: '200ms', transitionTimingFunction: 'ease-in', '&:hover': { opacity: 0.9, }, '&:disabled': { backgroundColor: '#e0e0e0', }, marginBottom: '1.75rem'}} 
          disabled={selectedType === ''}
          type='submit'
          variant="contained"> 
            CONTINUAR
        </Button>
      </form>
    </div>
  )
}
