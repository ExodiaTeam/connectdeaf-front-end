import { CardAssessment } from "@/components/card-assessment";
import { CardService } from "@/components/card-service";
import { ModalCreateService } from "@/components/modal-create-service";
import { Avatar, IconButton } from "@mui/material";
import { MapPin, PencilSimple, Plus, User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import assessmentEmpty from '../../assets/assessments-empty.svg';

interface Service {
    id: string;
    name: string;
    location: string;
    description: string;
    category: string[];
    value: string;
    avatar?: string;
    image?: string;
}

interface Assessment {
    name: string;
    stars: number;
    description: string;
}

interface Profile {
    name: string;
    location: string;
    description: string;
    imageUrl: string;
    category: string[];
    listServices: Service[];
    assessments: Assessment[];
}

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

export const ProfileProfessional = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            const servicesRequest = await getAllServices();
            setServices(servicesRequest || []);
        };

        fetchServices();
    }, []);

    const isMyProfile = location.pathname.includes('/myprofile');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const profile: Profile = {
        name: 'Kairo Professional',
        location: 'Option 1 - Option 2',
        description: '',
        imageUrl: '',
        category: [],
        listServices: [],
        assessments: []
    };

    const openModalService = () => {
        setIsModalOpen(true);
    };

    const closeModalService = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-11/12 mx-auto p-5 flex gap-5 flex-col">
            <div className="w-full bg-white rounded-lg shadow-lg gap-6 p-5 flex items-center border-[1px] border-primary-700">
                <div className="flex-none w-24 h-24 rounded-full">
                    {profile.imageUrl ? (
                        <Avatar src={profile.imageUrl} alt="Avatar" sx={{ width: '100%', height: '100%', borderRadius: '9999' }} />
                    ) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
                            <User size={32} />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-4/12">
                    <span className="block text-gray-900 truncate max-w-full overflow-hidden whitespace-nowrap">{profile.name}</span>
                    <span className="block text-primary-500 text-sm flex items-center"><MapPin size={20} /> {profile.location}</span>
                    <p className="block text-disabled-500 text-xs">{profile.description}</p>
                </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow-lg gap-4 p-5 flex flex-col border-[1px] border-primary-700">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div>Mais sobre mim</div>
                        {isMyProfile && (
                            <IconButton>
                                <PencilSimple color="#3D66CC" size={20} />
                            </IconButton>
                        )}
                    </div>
                    <div className="text-disabled-500">
                        {profile.description ? (
                            profile.description
                        ) : (
                            <div>
                                {isMyProfile ? (
                                    <div className="flex items-center">
                                        Você ainda não escreveu nada aqui. Clique no "<PencilSimple color="#3D66CC" size={20} />" para escrever algo sobre você.
                                    </div>
                                ) : (
                                    <div>Este usuário ainda não tem uma descrição</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {profile.category.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <h2>Minhas habilidades</h2>
                        <div className='flex flex-row gap-2' style={{ overflowY: 'scroll', scrollbarWidth: 'none', textWrap: 'wrap', textOverflow: 'ellipsis' }}>
                            {profile.category.map((cat, index) => (
                                <div key={index} className='bg-primary-700 rounded-full px-2 py-1' style={{ height: '28px', textWrap: 'nowrap' }}>{cat}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full bg-white rounded-lg shadow-lg gap-4 p-5 flex flex-col border-[1px] border-primary-700">
                <div className="flex items-center justify-between">
                    <h2>Meus serviços</h2>
                    {isMyProfile && (
                        <Plus color="#3D66CC" size={24} style={{ cursor: 'pointer' }} onClick={openModalService} />
                    )}
                </div>
                {profile.listServices.length > 0 ? (
                    <div className="flex gap-4">
                        {services.map((service) => (
                            <CardService key={service.id} {...service} />
                        ))}
                    </div>
                ) : (
                    <div className="text-disabled-500">
                        {isMyProfile ? (
                            <div className="flex items-center">
                                Você ainda não cadastrou nenhum serviço. Clique no "<Plus color="#3D66CC" size={24} />" para cadastrar serviço.
                            </div>
                        ) : (
                            <div>Este usuário ainda não possui serviços cadastrados.</div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full bg-white rounded-lg gap-6 shadow-lg p-5 flex flex-col border-[1px] border-primary-700">
                <div>
                    <h2>Avaliações sobre o profissional</h2>
                    <div>4,8</div>
                </div>
                {profile.assessments.length > 0 ? (
                    <div>
                        {profile.assessments.map((assessment, index) => (
                            <CardAssessment key={index} {...assessment} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <img src={assessmentEmpty} alt="Nenhuma avaliação" />
                        Ainda não há nenhuma avaliação.
                    </div>
                )}
            </div>
            <ModalCreateService open={isModalOpen} onClose={closeModalService} userId={id} />
        </div>
    );
};