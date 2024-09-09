import CardAppointments from "@/components/card-appointment"
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { MagnifyingGlass } from "@phosphor-icons/react"
import { Controller, useForm } from "react-hook-form";

export const Appointments = () => {

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
      } = useForm()

    type Appointments = {
        id: string;
        name: string;
        date: string;
        status: string;
        service: string;
        avatar?: string | undefined;
    }

    const myAppointments :Appointments[] = [
        {
            id: '1',
            name: 'joao joao joao',
            date: '12/12/2024',
            status: 'Em espera',
            service: 'Desenvolvedor',
            avatar: undefined
        },
        {
            id: '2',
            name: 'Kairo kairo kairo',
            date: '12/12/2024',
            status: 'Concluído',
            service: 'Serviço',
            avatar: 'https://avatars.githubusercontent.com/u/59853941?v=4'
        },
        {
            id: '3',
            name: 'airton araujo rocha',
            date: '12/12/2024',
            status: 'Cancelado',
            service: 'Dev',
            avatar: 'https://avatars.githubusercontent.com/u/59853941?v=4'
        },
        {
            id: '4',
            name: 'Thumbiko James',
            date: '12/12/2024',
            status: 'Concluído',
            service: 'Enfermeiro',
            avatar: 'https://avatars.githubusercontent.com/u/59853941?v=4'
        },
        {
            id: '5',
            name: 'joao',
            date: '12/12/2024',
            status: 'Em espera',
            service: 'Dev',
            avatar: 'https://avatars.githubusercontent.com/u/59853941?v=4'
        },
        {
            id: '6',
            name: 'Kairo2',
            date: '12/12/2024',
            status: 'Concluído',
            service: 'Serviço',
            avatar: 'https://avatars.githubusercontent.com/u/59853941?v=4'
        },
        {
            id: '7',
            name: 'Kairo3',
            date: '12/12/2024',
            status: 'Concluído',
            service: 'Serviço',
            avatar: 'https://avatars.githubusercontent.com/u/59853941?v=4'
        },
    ]

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <div className="flex flex-col justify-center items-center mt-16 mb-16 w-full h-full">
            <div className='text-2xl font-medium font-sans mb-12'>Agendamentos</div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4 w-89">
                <TextField
                    label="Serviço"
                    placeholder="Pesquisar por serviço, prestador..."
                    sx={{width: '40%'}}
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
                    name="status"
                    control={control}
                    defaultValue=""
                    rules={{ required: false }}
                    render={({ field }) => (
                        <TextField
                        select
                        label="Status do Serviço"
                        sx={{width: '26%'}}
                        {...field}
                        >
                        <MenuItem value="" disabled>
                            <em>Status do Serviço</em>
                        </MenuItem>
                        <MenuItem value="Em espera">Em espera</MenuItem>
                        <MenuItem value="Concluído">Concluído</MenuItem>
                        <MenuItem value="Cancelado">Cancelado</MenuItem>
                        </TextField>
                    )}
                />
                <Controller
                    name="dataInicial"
                    control={control}
                    defaultValue=""
                    rules={{ required: false, pattern: /^\d{2}\/\d{2}\/\d{4}$/ }}
                    render={({ field }) => (
                        <TextField
                        label="Data Inicial"
                        placeholder="DD/MM/AAAA"
                        sx={{width: '15%'}}
                        {...field}
                        error={!!errors.dataInicial}
                        helperText={errors.dataInicial ? 'Formato de data inválido' : ''}
                        />
                    )}
                />
                <hr className='bg-[#1d1d1d] h-0.5 w-6 mt-6'></hr>
                <Controller
                    name="dataFinal"
                    control={control}
                    defaultValue=""
                    rules={{ required: false, pattern: /^\d{2}\/\d{2}\/\d{4}$/ }}
                    render={({ field }) => (
                        <TextField
                        label="Data Final"
                        placeholder="DD/MM/AAAA"
                        sx={{width: '15%'}}
                        {...field}
                        error={!!errors.dataFinal}
                        helperText={errors.dataFinal ? 'Formato de data inválido' : ''}
                        />
                    )}
                />
            </form>
            <div className='w-89 h-full flex justify-center items-end' style={{marginTop: '40px'}}>
                {myAppointments.length > 0 ? 
                    <div className='w-full'>
                        <CardAppointments appointments={myAppointments} ></CardAppointments>
                    </div>
                    : 
                    <div className='h-full flex justify-center items-center text-disabled-700 font-medium font-serif text-lg mt-36'>
                        Você ainda não tem nenhum Serviço Agendado.
                    </div> 
                }
            </div>
        </div>
    )
}