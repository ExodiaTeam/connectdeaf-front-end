import { Button } from '@/components/button'
import { Fieldset } from '@/components/fieldset'
import { Select } from '@/components/select'
import { useForm } from 'react-hook-form'
import { Upload, User } from '@phosphor-icons/react';
import { useState } from 'react';
import { Avatar } from '@mui/material';

export const SignUpProfessional = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const areasAtuacao = ['Option 1', 'Option 2', 'Option 3']
  const qualificacao = ['Option 1', 'Option 2', 'Option 3']
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit = (data: any) => {
    console.log(data)
  }

  // ainda vou tipar essa imagem
  const handleDrop = (image: any) => {
    image.preventDefault()
    const files = image.dataTransfer.files
    if (files.length) {
      const file = files[0]
      setValue('image', file)
    }
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
                {...register('image', { required: true })}
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
          <Fieldset title='Nome completo'>
            <input placeholder='Nome' />
          </Fieldset>
          <Fieldset title='Email'>
            <input placeholder='seu@email.com' />
          </Fieldset>
          <div className="flex w-full space-x-4">
            <Fieldset title='Senha'>
              <input />
            </Fieldset>
            <Fieldset title='Telefone'>
              <input placeholder='(11) 1 1111-1111' />
            </Fieldset>
          </div>
          {/* FALTA ADICIONAR A VERIFICAÇÃO PARA NÃO DEIXAR O USUARIO MANDAR SEM SELECIOANR UMA OPÇÃO */}
          <div className="flex w-full space-x-4">
            <Fieldset title='Área de atuação'>
              <Select placeholder='Área de atuação'>
                {areasAtuacao.map((area) => {
                  return <option value={area}>{area}</option>
                })}
              </Select>
            </Fieldset>
            <Fieldset title='Qualificação'>
              <Select placeholder='Qualificação'>
                {qualificacao.map((area) => {
                  return <option value={area}>{area}</option>
                })}
              </Select>
            </Fieldset>
          </div>
        </div>
        <Button type="submit">
          CONTINUAR
        </Button>
      </form>
    </div>
  )
}
