import { EyeNoneIcon, PersonIcon, TriangleDownIcon, UploadIcon } from '@radix-ui/react-icons';
import { Avatar, Button, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

export const SignupProfessional = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const areasAtuacao = ['Option 1', 'Option 2', 'Option 3'];
    const qualificacao = ['Option 1', 'Option 2', 'Option 3'];
    const [selectedArea, setSelectedArea] = useState('Área de atuação');
    const [selectedQualificacao, setSelectedQualificacao] = useState('Qualificação');


    const onSubmit = (data: any) => {
        console.log(data);
    };

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
                <p className="text-2xl font-medium">Dados do prestador</p>
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
                {/* FALTA ADICIONAR A VERIFICAÇÃO PARA NÃO DEIXAR O USUARIO MANDAR SEM SELECIOANR UMA OPÇÃO */}
                <div className='w-full flex space-x-4'>
                    <div className='text-sm flex-grow w-80'>
                        Área de atuação
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className='w-full border border-gray-300 rounded-md p-2 h-10'>
                                <div className='flex justify-between items-center'>
                                    <span>{selectedArea}</span>
                                    <TriangleDownIcon />
                                </div>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                {areasAtuacao.map((area, index) => (
                                    <DropdownMenu.Item key={index} onSelect={() => {
                                        setValue('areaAtuacao', area);
                                        setSelectedArea(area);
                                    }} style={{
                                        padding: '10px', backgroundColor: '#f5f3f3', border: '1px solid #d1cece', borderRadius: '5px', marginBottom: '5px'
                                    }}>
                                        {area}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                    <div className='text-sm flex-grow w-80'>
                        Qualificação
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger className='w-full border border-gray-300 rounded-md p-2 h-10'>
                                <div className='flex justify-between items-center'>
                                    <span>{selectedQualificacao}</span>
                                    <TriangleDownIcon />
                                </div>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                {qualificacao.map((qualificacao, index) => (
                                    <DropdownMenu.Item key={index} onSelect={() => {
                                        setValue('qualificacao', qualificacao);
                                        setSelectedQualificacao(qualificacao);
                                    }} style={{
                                        padding: '10px', backgroundColor: '#f5f3f3', border: '1px solid #d1cece', borderRadius: '5px', marginBottom: '5px'
                                    }}>
                                        {qualificacao}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                </div>

            </div>
            <Button type='submit' style={{ marginBottom: '10px' }} size='3'>CONTINUAR</Button>
        </form>
    );
};