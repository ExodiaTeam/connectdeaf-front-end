import { CardService } from "@/components/card-service"
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { MagnifyingGlass } from "@phosphor-icons/react"
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

async function getAllServices() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:8080/api/services', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const services = await response.json();
        console.log('Serviços:', services);
        return services;
    } catch (error) {
        console.error('Erro ao obter serviços:', error);
    }
}

export const ListServices = () => {
    const [services, setServices] = useState<any[]>([]);

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm();

    const cidades = ['Option 1', 'Option 2', 'Option 3'];
    const estados = ['Option 1', 'Option 2', 'Option 3'];

    useEffect(() => {
        const fetchServices = async () => {
            const servicesRequest = await getAllServices();
            setServices(servicesRequest || []);
        };

        fetchServices();
    }, []);

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col justify-center items-center mt-16 mb-16 w-full">
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
                {
                    services.length === 0 ?
                        <div className='text-center text-lg font-medium font-sans mt-12'>Nenhum serviço encontrado.</div>
                        :
                        <div className='grid grid-cols-3 gap-6 w-89' style={{marginTop: '40px'}}>
                            {services.map((service) => (
                                <CardService key={service.id} {...service} />
                            ))}
                        </div>
                }
        </div>
    );
};