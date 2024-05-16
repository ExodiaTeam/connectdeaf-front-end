import { Heart, Image, MapPin, User } from '@phosphor-icons/react'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import * as Avatar from '@radix-ui/react-avatar'

type CardServiceProps = {
  name: string
  location: string
  description: string
  category: string[]
  avatar?: string | undefined
  image?: string | undefined
}

export const CardService = ({
  name,
  location,
  description,
  category,
  avatar = undefined,
  image = undefined,
}: CardServiceProps) => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-4 rounded border">
      <div className="flex h-2/4">
        <AspectRatio.Root ratio={16 / 9} className="w-full">
          {image === undefined ? (
            <div className="flex h-full w-full items-center justify-center bg-black">
              <Image size={64} color="#ffffff" />
            </div>
          ) : (
            <div className="h-full w-full">
              <img
                src={image}
                alt="Serviço prestado"
                className="h-full w-full"
              />
            </div>
          )}
        </AspectRatio.Root>
      </div>
      <div className="flex flex-row items-center">
        <div className="h-full w-1/5 bg-transparent">
          {avatar === undefined ? (
            <div className="flex h-full items-center justify-center rounded-full">
              <User size={32} />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-full">
              <Avatar.Root>
                <Avatar.Image
                  src={avatar}
                  alt="random"
                  className="h-8 w-8 rounded-full"
                />
              </Avatar.Root>
            </div>
          )}
        </div>
        <div className="w-3/5 overflow-hidden">
          <div>{name}</div>
          <div className="flex flex-row gap-1 text-primary-500">
            {' '}
            <MapPin size={20} className="flex-shrink-0" /> {location}
          </div>
        </div>
        <Heart size={32} className="w-1/5" />
      </div>
      <div className="ml-4 h-12 overflow-hidden">{description}</div>
      <div className="mb-4 ml-4 flex flex-row gap-2">
        {category.map((cat) => {
          return (
            <div className="inline-block rounded-full bg-primary-700 px-2 py-1">
              {cat}
            </div>
          )
        })}
      </div>
    </div>
  )
}
