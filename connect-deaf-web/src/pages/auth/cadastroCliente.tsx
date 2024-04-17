import { TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';

export const CadastroCliente = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <TextField.Root {...register('nome', { required: true })} placeholder='NOMEEE'></TextField.Root>

            <TextField.Root {...register('nome', { required: true })} placeholder='NOMEEE'></TextField.Root>

            <div style={{ display: 'flex' }}>
                <TextField.Root {...register('nome', { required: true })} placeholder='NOMEEE'></TextField.Root>

                <TextField.Root {...register('nome', { required: true })} placeholder='NOMEEE'></TextField.Root>
            </div>
        </form>
    );
};