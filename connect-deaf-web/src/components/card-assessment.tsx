import { User } from "@phosphor-icons/react";

type CardAssessmentProps = {
    name: string;
    stars: number;
    description: string;
}

export const CardAssessment = ( {name, stars, description} : CardAssessmentProps ) => {
    return (
        <div className="flex flex-col gap-2 bg-gray-100 rounded-lg shadow-md p-6 w-full mx-auto">
            <div className="flex gap-2 items-center">
                <User size={32} />
                <span>{name}</span>
            </div>
            <div className="flex gap-1">
                {
                    Array.from({length: 5}, (_, index) => {
                        return (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill={index < stars ? 'currentColor' : 'none'} stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2 3 3-1-1 3 2 2-3 1-2 3-2-3-3-1 1-3-2-2 3-1z" />
                            </svg>
                        )
                    })
                }
            </div>
            <p>{description}</p>
        </div>
    )
}