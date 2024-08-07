import { Button } from "@mui/material"
import { CheckCircle } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"

export const SignUpFinishing = () => {

    const navigate = useNavigate();

    const onNavigate = () => {
        navigate('/services')
    }

    return (
        <div className="flex flex-col items-center w-full gap-y-10">
            <div className="flex flex-col items-center">
                <CheckCircle size={64} color="#3d66cc" weight="fill" />
                <div className="my-2 text-xl font-bold">
                    Usuário criado com sucesso
                </div>
                <div className="text-slate-500">
                    Seja bem vindo à uma comunidade que faz a diferença. 
                </div>
            </div>
            <Button 
                sx={{display: 'flex', height: '42px', width: '50%', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', backgroundColor: '#3D66CC', padding: '1rem', color: '#FFFFFF',  transitionDuration: '200ms', transitionTimingFunction: 'ease-in', '&:hover': { opacity: 0.9, }, '&:disabled': { backgroundColor: '#e0e0e0', }, marginBottom: '1.75rem'}}  
                variant="contained"
                onClick={onNavigate}> 
                    IR PARA A PÁGINA INICIAL
            </Button>
        </div>
    )
}