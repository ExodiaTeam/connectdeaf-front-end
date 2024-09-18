import { CardDetailService } from "@/components/card-detail-service";
import { CardProfile } from "@/components/card-profile";
import { useLocation } from "react-router-dom";

export const Service = () => {
    const location = useLocation();
    const { name, state, city, descriptionProfessional, description, category, avatar, professionalId, id } = location.state || {};

    return (
        <div className="w-11/12 mx-auto p-5 flex gap-5 flex-col">
            <CardProfile 
                name={name} 
                city={city}
                state={state} 
                description={descriptionProfessional} 
                imageUrl={avatar} 
                professionalId={professionalId}
                serviceId={id}
            />
            <CardDetailService 
                category={category} 
                title="teste" 
                description={description} 
            />
        </div>
    );
};