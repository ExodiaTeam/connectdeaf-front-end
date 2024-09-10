import { CardAssessment } from "@/components/card-assessment"
import { Avatar, IconButton } from "@mui/material"
import { MapPin, PencilSimple, User } from "@phosphor-icons/react"
import { useLocation, useParams } from "react-router-dom"

export const ProfileClient = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
  
    const profile = {
      name: 'João da Silva',
      location: 'Fortaleza, CE',
      description: 'Lorem Ipsulum',
      imageUrl: '',
      assessments: [
        {
          name: 'Luis Estevam',
          stars: 5,
          description: 'Excelente cliente.'
        }
      ]
    };
  
    const isMyProfile = location.pathname.includes('/myprofile');
  
    return (
      <div className="w-11/12 mx-auto p-5 flex gap-5 flex-col">
        <div className="w-full bg-white rounded-lg shadow-lg gap-6 p-5 flex items-center border-[1px] border-primary-700">
          <div className="flex-none w-24 h-24 rounded-full">
            {
              profile.imageUrl ?
                <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
                  <User size={32} />
                </div>
                :
                <Avatar src={profile.imageUrl} alt="Avatar" sx={{ width: '100%', height: '100%', borderRadius: '9999' }} />
            }
          </div>
          <div className="flex flex-col gap-2 w-4/12">
            <span className="block text-gray-900 truncate max-w-full overflow-hidden whitespace-nowrap">{profile.name}</span>
            <span className="block text-primary-500 text-sm flex items-center"><MapPin size={20} /> {profile.location}</span>
            <p className="block text-disabled-500 text-xs">{profile.description}</p>
          </div>
        </div>
  
        <div className="w-full bg-white rounded-lg shadow-lg gap-6 p-5 flex flex-col border-[1px] border-primary-700">
          <div className="flex justify-between items-center">
            <h2>Mais sobre mim</h2>
            {isMyProfile && (
              <IconButton>
                <PencilSimple size={20} />
              </IconButton>
            )}
          </div>
          <div className="text-disabled-500">{profile.description}</div>
        </div>
  
        <div className="w-full bg-white rounded-lg gap-6 shadow-lg p-5 flex flex-col border-[1px] border-primary-700">
          <div>
            <h2>Avaliações sobre o cliente</h2>
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
    );
  };