import { CardAssessment } from "@/components/card-assessment";
import { Avatar, IconButton } from "@mui/material";
import { MapPin, PencilSimple, User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import assessmentEmpty from '../../assets/assessments-empty.svg';

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
    assessments: Assessment[];
}

async function getProfile(userId: string | undefined) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://connectdeaf-app-hml.azurewebsites.net/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const profile = await response.json();
        return profile;
    } catch (error) {
        console.error('Erro ao obter perfil:', error);
    }
}

export const ProfileClient = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const profileRequest = await getProfile(id);
            setProfile(profileRequest);
            console.log(profileRequest);
        };

        fetchProfile();
    }, [id]);

    const isMyProfile = location.pathname.includes("/myprofile");

    if (!profile) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="mx-auto flex w-11/12 flex-col gap-5 p-5">
            <div className="flex w-full items-center gap-6 rounded-lg border-[1px] border-primary-700 bg-white p-5 shadow-lg">
                <div className="h-24 w-24 flex-none rounded-full">
                    {profile.imageUrl ? (
                        <Avatar
                            src={profile.imageUrl}
                            alt="Avatar"
                            sx={{ width: "100%", height: "100%", borderRadius: "9999" }}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                            <User size={32} />
                        </div>
                    )}
                </div>
                <div className="flex w-4/12 flex-col gap-2">
                    <span className="block max-w-full overflow-hidden truncate whitespace-nowrap text-gray-900">
                        {profile.name}
                    </span>
                    <span className="block flex items-center text-sm text-primary-500">
                        <MapPin size={20} /> {profile.location}
                    </span>
                    <p className="block text-xs text-disabled-500">
                        {profile.description}
                    </p>
                </div>
            </div>

            <div className="flex w-full flex-col gap-6 rounded-lg border-[1px] border-primary-700 bg-white p-5 shadow-lg">
                <div>
                    <div className="flex items-center justify-between">
                        <h2>Mais sobre mim</h2>
                        {isMyProfile && (
                            <IconButton>
                                <PencilSimple size={20} />
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
            </div>

            <div className="flex w-full flex-col gap-6 rounded-lg border-[1px] border-primary-700 bg-white p-5 shadow-lg">
                <div>
                    <h2>Avaliações sobre o cliente</h2>
                    <div>4,8</div>
                </div>
                {profile.assessments ? (
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
        </div>
    );
};