import { Avatar } from '@mui/material';
import { Heart, Image, MapPin, User } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CardServiceProps = {
    name: string;
    professional?: any;
    description: string;
    category: string[];
    avatar?: string | undefined;
    image?: string | undefined;
    value: string;
    id: string;
}

export const CardService = ({ id, name, professional, description, category, avatar = undefined, image = undefined, value }: CardServiceProps) => {
    
    const navigate = useNavigate();

    const [favorite, setFavorite] = useState(false);

    const city = professional.addresses[0].city;
    const state = professional.addresses[0].state;
    const professionalId = professional.id;
    const descriptionProfessional = professional.email;

    const handleClickCard = () => {
        navigate('/service', { state: { name, description, descriptionProfessional, category, avatar, image, city, state, professionalId, id } });
    }

    return (
        <div className="grid gap-2 cursor-pointer" onClick={handleClickCard}>
            <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" style={{ width: '362px', height: '396px' }}>
                <a>
                <div style={{ width: '362px', height: '200px' }}>
                    {
                    image === undefined ?
                        <div className='bg-black w-full h-full flex items-center justify-center'>
                        <Image size={64} color="#ffffff" />
                        </div>
                        :
                        <img src={image} alt='Serviço prestado' className="w-full h-full rounded-t-md object-cover" />
                    }
                </div>
                <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                    <div className="flex-none w-10 h-10 rounded-full">
                    {
                        avatar === undefined ?
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
                            <User size={32} />
                        </div>
                        :
                        <Avatar src={avatar} alt="Avatar" sx={{ width: '100%', height: '100%', borderRadius: '9999' }} />
                    }
                    </div>
                    <div className="ml-3" style={{width: '240px'}}>
                        <span className="block text-gray-900" style={{overflow: 'hidden', textWrap: 'nowrap', textOverflow: 'ellipsis'}}>{name}</span>
                        <span className="block text-gray-400 text-sm flex"><MapPin size={20} className='flex-shrink-0' /> {professional.addresses[0].city} - {professional.addresses[0].state}</span>
                    </div>
                    <div style={{cursor: 'pointer'}} onClick={() => setFavorite(!favorite)}>
                        
                        {
                            favorite?
                                <Heart size={32} color="#999999" weight="fill" />
                            : 
                                <Heart size={32}/>
                        }
                    </div>
                </div>
                <div className="pt-3 ml-4 mr-2 mb-3">
                    <p className="text-sm mt-1"> A partir de {value}</p>
                    <p className="text-gray-400 text-sm mt-1 h-16" style={{ overflowY: 'scroll', textWrap: 'wrap', textOverflow: 'ellipsis'}}>{description}</p>
                </div>
                {
                    category? 
                        <div className='ml-4 flex flex-row gap-2 mb-4' style={{ overflowY: 'scroll', scrollbarWidth:'none', textWrap: 'wrap', textOverflow: 'ellipsis'}}>
                        {
                        category.map((cat, index) => (
                        <div key={index} className='bg-primary-700 rounded-full px-2 py-1' style={{height: '28px', textWrap: 'nowrap'}}>{cat}</div>
                        ))}
                        </div>
                    :
                    <></>
                }
                </a>
            </article>
        </div>
    )
}