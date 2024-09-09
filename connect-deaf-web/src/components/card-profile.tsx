import { Avatar, Button } from "@mui/material";
import { Calendar, MapPin, User } from "@phosphor-icons/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ScheduleModal } from "./modal-schedule";

interface ProfileCardProps {
    name: string;
    location: string;
    description: string;
    imageUrl?: string;
}

export const CardProfile = ({ name, location, description, imageUrl }: ProfileCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { serviceId } = useParams<{ serviceId: string }>();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg gap-6 justify-between p-5 flex items-center border-[1px] border-primary-700">
            <div className="flex-none w-24 h-24 rounded-full">
                {
                    imageUrl ?
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
                            <User size={32} />
                        </div>
                        :
                        <Avatar src={imageUrl} alt="Avatar" sx={{ width: '100%', height: '100%', borderRadius: '9999' }} />
                }
            </div>
            <div className="flex flex-col gap-2 w-3/5">
                <span className="block text-gray-900 truncate max-w-full overflow-hidden whitespace-nowrap">{name}</span>
                <span className="block text-primary-500 text-sm flex items-center"><MapPin size={20} /> {location}</span>
                <p>{description}</p>
            </div>
            <div className="w-2/5 flex flex-col gap-4">
                <Button variant="contained" onClick={handleOpenModal}>
                    <Calendar size={32} /> Agendar um Serviço
                </Button>
                <Button variant="outlined">Ver Perfil do Profissional</Button>
            </div>
            <ScheduleModal open={isModalOpen} onClose={handleCloseModal} serviceId={serviceId} />
        </div>
    );
};