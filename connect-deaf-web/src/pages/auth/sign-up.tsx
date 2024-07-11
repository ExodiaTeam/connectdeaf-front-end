import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import { Button } from '@/components/button'

import clientImg from '../../assets/cliente.svg'
import professionalImg from '../../assets/profissional.svg'

interface UserRegistrationType {
  type: 'client' | 'professional'
}

export function SignUp() {
  const { control, handleSubmit } = useForm<UserRegistrationType>()
  const [isOptionSelected, setIsOptionSelected] = useState(false)

  const navigate = useNavigate()

  function handleUserRegistrationType(data: UserRegistrationType) {
    navigate(`/sign-up/${data.type}`)
  }

  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    if (value) setIsOptionSelected(true)
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(handleUserRegistrationType)}
        className="flex h-full max-w-xl flex-col items-center gap-6 px-3"
      >
        <p className="text-xl font-medium">Você é um...</p>
        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="user-type"
                  defaultValue="client"
                  name="user-type"
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel
                    value="client"
                    control={<Radio />}
                    label={
                      <div className="flex flex-col items-center">
                        <img src={clientImg} alt="Cliente" />
                        <p>Cliente</p>
                      </div>
                    }
                  />
                  <FormControlLabel
                    value="professional"
                    control={<Radio />}
                    label={
                      <div className="flex flex-col items-center">
                        <img src={professionalImg} alt="Profissional" />
                        <p>Profissional</p>
                      </div>
                    }
                  />
                </RadioGroup>
              </FormControl>
            )
          }}
        />
        <Button type="submit" disabled={!isOptionSelected}>
          CONTINUAR
        </Button>
      </form>
    </div>
  )
}
