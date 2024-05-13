import { CardService } from "@/components/card-service"
import { Select } from "@/components/select";
import { MagnifyingGlass } from "@phosphor-icons/react"


export const ListServices = () => {
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
    return (
        <div className="flex flex-col justify-center items-center mt-16 w-full">
            <div className='text-2xl font-medium font-sans'>Serviços</div>
            <div className='font-serif text-disabled-500 mt-2 mb-10'>Talentos cuidadosamente escolhidos para suprir suas demandas profissionais.</div>
            <div className="flex flex-row gap-4 w-89">
                <div className="flex w-2/4 gap-2 rounded-md px-3 py-2 border border-disabled-500">
                    <MagnifyingGlass size={24} className="text-disabled-500" />
                    <input
                        type="text"
                        placeholder="Pesquisar por serviço..."
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                <div className="w-1/4 flex justify-between items-center border border-disabled-500 rounded-md px-3 py-2">
                    <Select placeholder="Estado">
                        <option value="1">Estado</option>
                        <option value="2">Categoria 1</option>
                        <option value="3">Categoria 2</option>
                        <option value="4">Categoria 3</option>
                    </Select>
                </div>
                <div className="w-1/4 flex justify-between items-center border border-disabled-500 rounded-md px-3 py-2">
                    <Select placeholder="Cidade">
                        <option value="2">Categoria 1</option>
                        <option value="3">Categoria 2</option>
                        <option value="4">Categoria 3</option>
                    </Select>
                </div>
            </div>
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