import { EyeNoneIcon, PersonIcon, UploadIcon } from '@radix-ui/react-icons';
import { Avatar, Button, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';

export const SignupClient = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const { setValue } = useForm();

    //ainda vou tipar essa imagem
    const handleDrop = (imagem: any) => {
        imagem.preventDefault();
        const files = imagem.dataTransfer.files;
        if (files.length) {
            const file = files[0];
            setValue('image', file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center flex-col gap-6 w-[644px]'>
            <div className='flex justify-center'>
                <p className="text-2xl font-medium">Dados do usuário</p>
            </div>
            <div className='flex gap-x-5'>
                <Avatar radius='full' fallback={<PersonIcon style={{ width: '64px', height: '64px' }} />} size='9' />
                <div className='flex flex-col items-start justify-center space-y-4 w-full border-[2px] border-[rgba(169,169,169,0.5)] border-dashed border-gray-400 p-4' onDrop={handleDrop}>
                    <UploadIcon style={{ width: '24px', height: '24px' }} />
                    <div>
                        <label htmlFor='file-upload' className='text-blue-500 cursor-pointer text-base underline'>
                            Clique para exportar
                        </label>
                        <input id='file-upload' type='file' {...register('image', { required: true })} style={{ display: 'none' }} onChange={(e) => setValue('image', e.target.files ? [0] : undefined)} />
                        <span> ou arraste uma foto</span>
                    </div>
                    <span className='opacity-40 text-sm '>
                        PNG ou JPG (max. 3MB)
                    </span>
                </div>
            </div>
            <div className='gap-3 flex flex-col w-auto '>
                <div className='text-sm'>
                    Nome completo
                    <TextField.Root {...register('nome', { required: true })} size='3' placeholder='Nome'></TextField.Root>
                </div>
                <div className='text-sm'>
                    Email
                    <TextField.Root {...register('email', { required: true })} size='3' placeholder='seu@email.com'></TextField.Root>
                </div>
                <div className='w-full flex space-x-4'>
                    <div className='text-sm flex-grow'>
                        Senha
                        <div className='relative'>
                            <TextField.Root {...register('senha', { required: true })} size='3' type='password' />
                            <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
                                <EyeNoneIcon className='h-5 w-5 text-gray-500' />
                            </span>
                        </div>
                    </div>
                    <div className='text-sm flex-grow'>
                        Telefone
                        <TextField.Root {...register('telefone', { required: true })} placeholder='(11) 11111-1111' size='3'></TextField.Root>
                    </div>
                </div>
            </div>
            <Button type='submit' style={{ marginBottom: '10px' }} size='3'>CONTINUAR</Button>
        </form>
    );
};