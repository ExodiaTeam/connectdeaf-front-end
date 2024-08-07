
interface CardDetailServiceProps {
    title: string;
    description: string;
    category: string[];
    image: string;
}

export const CardDetailService = ( { title, description, category, image } : CardDetailServiceProps ) => {
    return (
        <div className="w-full bg-white rounded-lg shadow-lg gap-6 p-5 flex border-[1px] border-primary-700">
            <div className="max-h-[400px] max-w-[570px]">
                <img src={image} alt="Service" />
            </div>
            <div className="w-full h-full flex flex-col gap-4">
                <div className="text-xl">{title}</div>
                <div className='flex flex-row gap-2'>
                    {category.map((cat, index) => (
                    <div key={index} className='bg-primary-700 rounded-full px-2 py-1 text-xs'>{cat}</div>
                    ))}
                </div>
                <div className="gap-4 flex flex-col">
                    <div className="text-xl">Sobre esse serviço</div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}