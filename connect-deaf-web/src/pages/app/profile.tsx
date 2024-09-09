import { CardAssessment } from "@/components/card-assessment"
import { CardService } from "@/components/card-service"
import { Avatar } from "@mui/material"
import { MapPin, User } from "@phosphor-icons/react"
import { useParams } from "react-router-dom"

export const Profile = () => {

    const { id } = useParams<{ id: string }>()

    const profile = {
        name: 'João da Silva',
        location: 'Fortaleza, CE',
        description: 'Sou um profissional de saúde com 10 anos de experiência em atendimento domiciliar. Atendo em diversas áreas da saúde, como fisioterapia, enfermagem e cuidados com idosos.',
        imageUrl: '',
        category: ['Fisioterapia', 'Enfermagem', 'Cuidados com idosos'],
        listServices: [
            {
                name: 'Serviço 1',
                location: 'Localização',
                description: 'Descrição',
                category: ['Categoria 1', 'Categoria 2'],
                avatar: 'https://avatars.githubusercontent.com/u/59853941?v=4',
                image: 'https://avatars.githubusercontent.com/u/59853941?v=4'
            },
            {
                name: 'Serviço 2',
                location: 'Localização',
                description: 'Descrição',
                category: ['Categoria 1', 'Categoria 2'],
                avatar: 'https://avatars.githubusercontent.com/u/59853940?v=4',
                image: 'https://avatars.githubusercontent.com/u/59853940?v=4'
            },
            {
                name: 'Serviço 3',
                location: 'Localização',
                description: 'Descrição',
                category: ['Categoria 1', 'Categoria 2'],
            }
        ],
        assessments: [
            {
                name: 'Luis Estevam',
                stars: 5,
                description: 'Excelente profissional, muito atencioso e competente.'
            }
        ]
    }

    return (
        <div className="w-11/12 mx-auto p-5 flex gap-5 flex-col">
            <div className="w-full bg-white rounded-lg shadow-lg gap-6 p-5 flex items-center border-[1px] border-primary-700">
                <div className="flex-none w-24 h-24 rounded-full">
                    {
                        profile.imageUrl?
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
                            <User size={32} />
                        </div>
                        :
                        <Avatar src={profile.imageUrl} alt="Avatar" sx={{ width: '100%', height: '100%', borderRadius: '9999' }} />
                    }
                </div>
                <div className="flex flex-col gap-2 w-4/12">
                    <span className="block text-gray-900 truncate max-w-full overflow-hidden whitespace-nowrap">{profile.name}</span>
                    <span className="block text-primary-500 text-sm flex items-center"><MapPin size={20}/> {profile.location}</span>
                    <p className="block text-disabled-500 text-xs">{profile.description}</p>
                </div>
            </div>
            
            <div className="w-full bg-white rounded-lg shadow-lg gap-6 p-5 flex flex-col border-[1px] border-primary-700">
                    <div>
                        <h2>Mais sobre mim</h2>
                        <div className="text-disabled-500">{profile.description}</div>
                    </div>
                    <div className="flex flex-col gap-2"> 
                        <h2>Minhas habilidades</h2>
                        <div className='flex flex-row gap-2' style={{ overflowY: 'scroll', scrollbarWidth:'none', textWrap: 'wrap', textOverflow: 'ellipsis'}}>
                            {profile.category.map((cat, index) => (
                                <div key={index} className='bg-primary-700 rounded-full px-2 py-1' style={{height: '28px', textWrap: 'nowrap'}}>{cat}</div>
                            ))}
                        </div>
                    </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow-lg gap-6 p-5 flex flex-col border-[1px] border-primary-700">
                <h2>Meus serviços</h2>
                <div className="flex gap-4">
                    {profile.listServices.map((service) => {
                        return (
                            <CardService {...service} />
                        )
                    })}
                </div>
            </div>

            <div className="w-full bg-white rounded-lg gap-6 shadow-lg p-5 flex flex-col border-[1px] border-primary-700">
                <div>
                    <h2>Avaliações sobre o profissional</h2>
                    <div>4,8</div>
                </div>
                <div>
                    {profile.assessments.map((assessment) => {
                        return (
                            <CardAssessment {...assessment} />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}