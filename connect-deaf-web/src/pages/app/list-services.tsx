import { CardService } from "@/components/card-service"
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { MagnifyingGlass } from "@phosphor-icons/react"
import { Controller, useForm } from "react-hook-form";


export const ListServices = () => {

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
      } = useForm()

    const cidades = ['Option 1', 'Option 2', 'Option 3']
    const estados = ['Option 1', 'Option 2', 'Option 3']

    const listServices = [
        {
            name: 'Kairo Matheus Sales Barbosa',
            location: 'Localização',
            description: 'Descrição do serviço Descrição do serviço Descrição do serviço Descrição do serviço Descrição do serviço Descrição do serviçoDescrição do serviço',
            category: ['Categoria 1', 'Categoria 2'],
            avatar: 'https://avatars.githubusercontent.com/u/59853941?v=4',
            image: 'https://avatars.githubusercontent.com/u/59853941?v=4'
        },
        {
            name: 'Nome do serviço',
            location: 'Localização',
            description: 'Descrição do serviço',
            category: ['Categoria 1', 'Categoria 2'],
            avatar: 'https://avatars.githubusercontent.com/u/59853940?v=4',
            image: 'https://avatars.githubusercontent.com/u/59853940?v=4'
        },
        {
            name: 'Nome do serviço',
            location: 'Localização',
            description: 'Descrição do serviço',
            category: ['Categoria 1', 'Categoria 2'],
        },
        {
            name: 'Nome do serviço',
            location: 'Localização',
            description: 'Descrição do serviço',
            category: ['Categoria 1', 'Categoria 2'],
        },
    ]

    const onSubmit = (data: any) => {
        console.log(data)
      }

    return (
        <div className="flex flex-col justify-center items-center mt-16 w-full">
            <div className='text-2xl font-medium font-sans'>Serviços</div>
            <div className='font-serif text-disabled-500 mt-2 mb-10'>Talentos cuidadosamente escolhidos para suprir suas demandas profissionais.</div>
            <form onChange={handleSubmit(onSubmit)} className="flex flex-row gap-4 w-89">
                <TextField
                    label="Serviço"
                    placeholder="Pesquisar por serviço..."
                    sx={{width: '50%'}}
                    {...register('servico', { required: false })}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <MagnifyingGlass size={24}/>
                            </InputAdornment>
                        ),
                    }}
                />
                <Controller
                    name="estado"
                    control={control}
                    defaultValue=""
                    rules={{ required: false }}
                    render={({ field }) => (
                        <TextField
                        select
                        label="Estado"
                        sx={{width: '25%'}}
                        {...field}
                        >
                        <MenuItem value="" disabled>
                            <em>Estado</em>
                        </MenuItem>
                        {estados.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    )}
                />
                <Controller
                    name="cidade"
                    control={control}
                    defaultValue=""
                    rules={{ required: false }}
                    render={({ field }) => (
                        <TextField
                        select
                        label="Cidade"
                        sx={{width: '25%'}}
                        {...field}
                        >
                        <MenuItem value="" disabled>
                            <em>Cidade</em>
                        </MenuItem>
                        {cidades.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    )}
                />
            </form>
            <div className='grid grid-cols-3 gap-6 w-89'>
                {listServices.map((service) => {
                    return (
                        <CardService {...service} />
                    )
                })}
            </div>
        </div>
    )
}