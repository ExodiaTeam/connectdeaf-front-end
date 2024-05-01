import { EyeNoneIcon, PersonIcon, UploadIcon } from '@radix-ui/react-icons'
import { Avatar, Button, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'

export const SignUpClient = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  // ainda vou tipar essa imagem
  const handleDrop = (imagem: any) => {
    imagem.preventDefault()
    const files = imagem.dataTransfer.files
    if (files.length) {
      const file = files[0]
      setValue('image', file)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[644px] flex-col justify-center gap-6"
    >
      <div className="flex justify-center">
        <p className="text-2xl font-medium">Dados do usuário</p>
      </div>
      <div className="flex gap-x-5">
        <Avatar
          radius="full"
          fallback={<PersonIcon style={{ width: '64px', height: '64px' }} />}
          size="9"
        />
        <div
          className="flex w-full flex-col items-start justify-center space-y-4 border-[2px] border-dashed border-[rgba(169,169,169,0.5)] border-gray-400 p-4"
          onDrop={handleDrop}
        >
          <UploadIcon style={{ width: '24px', height: '24px' }} />
          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-base text-blue-500 underline"
            >
              Clique para exportar
            </label>
            <input
              id="file-upload"
              type="file"
              {...register('image', { required: true })}
              style={{ display: 'none' }}
              onChange={(e) =>
                setValue('image', e.target.files ? [0] : undefined)
              }
            />
            <span> ou arraste uma foto</span>
          </div>
          <span className="text-sm opacity-40 ">PNG ou JPG (max. 3MB)</span>
        </div>
      </div>
      <div className="flex w-auto flex-col gap-3 ">
        <div className="text-sm">
          Nome completo
          <TextField.Root
            {...register('nome', { required: true })}
            size="3"
            placeholder="Nome"
          ></TextField.Root>
        </div>
        <div className="text-sm">
          Email
          <TextField.Root
            {...register('email', { required: true })}
            size="3"
            placeholder="seu@email.com"
          ></TextField.Root>
        </div>
        <div className="flex w-full space-x-4">
          <div className="flex-grow text-sm">
            Senha
            <div className="relative">
              <TextField.Root
                {...register('senha', { required: true })}
                size="3"
                type="password"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <EyeNoneIcon className="h-5 w-5 text-gray-500" />
              </span>
            </div>
          </div>
          <div className="flex-grow text-sm">
            Telefone
            <TextField.Root
              {...register('telefone', { required: true })}
              placeholder="(11) 11111-1111"
              size="3"
            ></TextField.Root>
          </div>
        </div>
      </div>
      <Button type="submit" style={{ marginBottom: '10px' }} size="3">
        CONTINUAR
      </Button>
    </form>
  )
}
