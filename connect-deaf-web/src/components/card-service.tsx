import * as Avatar from '@radix-ui/react-avatar';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Heart, Image, MapPin, User } from '@phosphor-icons/react';

type CardServiceProps = {
    name: string;
    location: string;
    description: string;
    category: string[];
    avatar?: string | undefined;
    image?: string | undefined;
}

export const CardService = ({ name, location, description, category, avatar = undefined, image = undefined }: CardServiceProps) => {
    return (
        <div className='flex flex-col w-full h-full border rounded mt-10 gap-4'>
            <div className='h-2/4 flex'>
                <AspectRatio.Root ratio={16 / 9} className='w-full'>
                    {
                        image === undefined ?
                            <div className='bg-black w-full h-full flex items-center justify-center'><Image size={64} color="#ffffff" /></div>
                            :
                            <div className='w-full h-full'>
                                <img src={image} alt='Serviço prestado' className='w-full h-full' />
                            </div>
                    }
                </AspectRatio.Root>
            </div>
            <div className='flex flex-row items-center'>
                <div className='w-1/5 h-full bg-transparent'>
                    {
                        avatar === undefined ?
                            <div className='h-full flex items-center justify-center rounded-full'>
                                <User size={32} />
                            </div>
                            :
                            <div className='h-full flex items-center justify-center rounded-full'>
                                <Avatar.Root>
                                    <Avatar.Image src={avatar} alt="random" className='rounded-full w-8 h-8' />
                                </Avatar.Root>
                            </div>
                    }
                </div>
                <div className='w-3/5 overflow-hidden'>
                    <div>{name}</div>
                    <div className="text-primary-500 flex flex-row gap-1"> <MapPin size={20} className='flex-shrink-0' /> {location}</div>
                </div>
                <Heart size={32} className='w-1/5' />
            </div>
            <div className='ml-4 h-12 overflow-hidden'>
                {description}
            </div>
            <div className='ml-4 flex flex-row gap-2 mb-4'>
                {category.map((cat) => {
                    return (
                        <div className='bg-primary-700 rounded-full px-2 py-1 inline-block'>{cat}</div>
                    )
                })}
            </div>
        </div>
    )
}