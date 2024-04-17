import * as RadioGroup from '@radix-ui/react-radio-group'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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

  function handleRadioChange(value: string) {
    if (value) setIsOptionSelected(true)
  }

  return (
    <form
      onSubmit={handleSubmit(handleUserRegistrationType)}
      className="flex h-full flex-col items-center justify-center gap-6"
    >
      <p className="text-xl font-medium">Você é um...</p>
      <Controller
        control={control}
        name="type"
        render={({ field }) => {
          return (
            <RadioGroup.Root
              onValueChange={(value) => {
                field.onChange(value)
                handleRadioChange(value)
              }}
              value={field.value}
              className="flex gap-10"
            >
              <RadioGroup.Item
                value="client"
                className="data-[state=checked]:bg-primary-50 border-disabled-500 flex h-64 w-64 flex-col items-center justify-end gap-4 rounded-md border-2 pb-6 shadow-[0px_4px_4px_0px_#00000040] hover:border-primary-300 data-[state=checked]:border-primary-300"
              >
                <img src={clientImg} alt="" />
                <p className="text-xl font-medium">Cliente</p>
              </RadioGroup.Item>
              <RadioGroup.Item
                value="professional"
                className="data-[state=checked]:bg-primary-50 border-disabled-500 flex h-64 w-64 flex-col items-center justify-end gap-3 rounded-md border-2 pb-6 shadow-[0px_4px_4px_0px_#00000040] hover:border-primary-300 data-[state=checked]:border-primary-300"
              >
                <img src={professionalImg} alt="" />
                <p className="text-xl font-medium">Profissional</p>
              </RadioGroup.Item>
            </RadioGroup.Root>
          )
        }}
      />
      <Button type="submit" disabled={!isOptionSelected}>
        CONTINUAR
      </Button>
    </form>
  )
}
