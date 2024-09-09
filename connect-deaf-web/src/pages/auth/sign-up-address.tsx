import { AppDispatch } from "@/redux"
import { createClient, selectCombinedData, setAddressData, selectedType } from "@/redux/formSlice"
import { Button, MenuItem, TextField } from "@mui/material"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const SignUpAddress = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const combinedData = useSelector(selectCombinedData);
  const typeSelected = useSelector(selectedType);

  const Estados = ['Option 1', 'Option 2', 'Option 3']
  const Cidades = ['Option 1', 'Option 2', 'Option 3']

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = ( data: any ) => {
    dispatch(setAddressData(data));
  }

  useEffect(() => {
    if (combinedData) {
      if(typeSelected === 'professional') {
        dispatch(createClient(combinedData)).then(() => {
          navigate('/sign-up/finishing');
        });
      } else if(typeSelected === 'client') {
        dispatch(createClient(combinedData)).then(() => {
        navigate('/sign-up/finishing');
      });
      }
    }
  }, [combinedData, dispatch, navigate]);

  return (
    <div className="flex flex-col items-center">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col items-center w-3/6 gap-y-10">
        <div className="text-2xl font-medium">Endereço</div>
        <div className="gap-4 flex w-full">
          <Controller
            name="state"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                select
                label="Estado"                
                placeholder="Estado"
                fullWidth
                {...field}
              >
                <MenuItem value="" disabled>
                  <em>Estados</em>
                </MenuItem>
                {Estados.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                select
                label="Cidade"
                placeholder="Cidade"
                fullWidth
                {...field}
              >
                <MenuItem value="" disabled>
                  <em>Cidades</em>
                </MenuItem>
                {Cidades.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        <TextField
          label= 'CEP'
          placeholder='00000-000'
          {...register('cep', { required: true })}
          sx={{width: '100%'}}
        />
        <div className='flex w-full gap-4'>
          <TextField
            label= 'Rua'
            placeholder='Rua'
            {...register('street', { required: true })}
            sx={{width: '62%'}}
          />
          <TextField
            label= 'Número'
            placeholder='Número'
            {...register('number', { required: true })}
            sx={{width: '38%'}}
          />
        </div>
        <div className='flex gap-4 w-full'>
          <TextField
            label= 'Bairro'
            placeholder='Bairro'
            {...register('neighborhood', { required: true })}
            sx={{width: '62%'}}
          />
          
          <TextField
            label= 'Complemento (opcional)'
            placeholder='Complemento'    
            {...register('complement', { required: false })}
            sx={{width: '38%'}}
          />
        </div>
        <Button
          sx={{display: 'flex', height: '42px', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', backgroundColor: '#3D66CC', padding: '1rem', color: '#FFFFFF',  transitionDuration: '200ms', transitionTimingFunction: 'ease-in', '&:hover': { opacity: 0.9, }, '&:disabled': { backgroundColor: '#e0e0e0', }, marginBottom: '1.75rem'}} 
          type='submit'
          variant="contained"> 
            CONTINUAR 
        </Button>
      </form>
    </div>
  )
}