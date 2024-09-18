import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

import clientImg from '../../assets/cliente.svg'
import professionalImg from '../../assets/profissional.svg'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserType } from '@/redux/formSlice';

interface UserRegistrationType {
  type: 'client' | 'professional'
}

export function SignUp() {
  const [selectedType, setselectedType] = useState('');

  const dispatch = useDispatch();

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
    dispatch(setUserType(data.type));
    navigate(`/sign-up/${data.type}`);
  }

  return (
    <div className="flex flex-col items-center">
      <form
      onSubmit={handleSubmit(handleUserRegistrationType)}
        className="flex h-full max-w-xl flex-col items-center gap-6 px-3"
      >
        <p className="text-xl font-medium">Você é um...</p>

        <div style={{display: 'flex', flexDirection: 'row', gap: '40px'}}>
          <div 
            className="flex h-64 w-64 flex-col items-center justify-end gap-4 rounded-md border-2 border-disabled-500 pb-6 shadow-[0px_4px_4px_0px_#00000040] hover:border-primary-300"
            style={{background:  selectedType === 'client' ? '#EEF7FF' : '', border: selectedType === 'client' ? '2px solid #59B3FF' : '2px solid #999999', cursor: 'pointer'}}
            onClick={() => handleTypeClick('client')}
          >
            <Box
              component="img"
              src={clientImg}
              alt='Client'
              {...register('type', { required: false })}
            />
            <p className="text-xl font-medium">Cliente</p>
          </div>
          <div 
            className="flex h-64 w-64 flex-col items-center justify-end gap-4 rounded-md border-2 border-disabled-500 pb-6 shadow-[0px_4px_4px_0px_#00000040] hover:border-primary-300"
            style={{background:  selectedType === 'professional' ? '#EEF7FF' : '', border: selectedType === 'professional' ? '2px solid #59B3FF' : '2px solid #999999', cursor: 'pointer'}}
            onClick={() => handleTypeClick('professional')}
          >
            <Box
              component="img"
              src={professionalImg}
              alt='Professional'
              {...register('type', { required: false })}
            />
            <p className="text-xl font-medium">Profissional</p>
          </div>
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
