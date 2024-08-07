import { CardDetailService } from "@/components/card-detail-service"
import { CardProfile } from "@/components/card-profile"
import { useLocation } from "react-router-dom"

export const Service = () => {

    const location = useLocation();
    const { name, location: locationService, description, category, avatar, image } = location.state;

    return (
        <div className="w-11/12 mx-auto p-5 flex gap-5 flex-col">
            <CardProfile 
                name={name} 
                location={locationService} 
                description={description} 
                imageUrl={avatar} 
            />
            <CardDetailService 
                category={category} 
                title="teste" 
                description={description} 
                image={image} 
            />
        </div>
    )
}