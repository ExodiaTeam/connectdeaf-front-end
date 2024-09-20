import CardAppointments from "@/components/card-appointment"
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { MagnifyingGlass } from "@phosphor-icons/react"
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const Appointments = () => {

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm()

    type Customer = {
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
    };

    type Professional = {
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        areaOfExpertise: string;
        qualification: string;
        workStartTime: string;
        workEndTime: string;
        breakDuration: string;
    };

    type Schedule = {
        id: string;
        professionalId: string;
        date: string;
        startTime: string;
        endTime: string;
    };

    type Service = {
        id: string;
        name: string;
        description: string;
        value: number;
        professional: Professional;
    };

    type Appointments = {
        id: string;
        customer: Customer;
        professional: Professional;
        schedule: Schedule;
        service: Service;
        status: string;
    };

    const getAllAppointments = async () => {
        const token = localStorage.getItem('token') || '';
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        const userId = JSON.parse(decodedPayload).sub;
        try {
            const response = await fetch('https://app-connectdeaf-hml-bmcgg9axekdjcva3.canadaeast-01.azurewebsites.net/api/appointments/customer/' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const appointments = await response.json();
            return appointments;
        } catch (error) {
            console.error('Erro ao obter agendamentos:', error);
        }
    }
    const fetchAppointments = async () => {
        const appointments = await getAllAppointments();
        return appointments;
    };

    const [myAppointments, setMyAppointments] = useState<Appointments[]>([]);

    useEffect(() => {
        fetchAppointments().then((appointments) => {
            setMyAppointments(appointments);
        });
    }, []);

    const onSubmit = (data: any) => {
    }

    return (
        <div className="flex flex-col justify-center items-center mt-16 mb-16 w-full h-full">
            <div className='text-2xl font-medium font-sans mb-12'>Agendamentos</div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4 w-89">
                <TextField
                    label="Serviço"
                    placeholder="Pesquisar por serviço, prestador..."
                    sx={{ width: '40%' }}
                    {...register('servico', { required: false })}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MagnifyingGlass size={24} />
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
                            sx={{ width: '26%' }}
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
                            sx={{ width: '15%' }}
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
                            sx={{ width: '15%' }}
                            {...field}
                            error={!!errors.dataFinal}
                            helperText={errors.dataFinal ? 'Formato de data inválido' : ''}
                        />
                    )}
                />
            </form>
            <div className='w-89 h-full flex justify-center items-end' style={{ marginTop: '40px' }}>
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