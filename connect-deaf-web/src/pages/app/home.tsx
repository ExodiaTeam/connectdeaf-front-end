import homepageBaseImg from '../../assets/homepage-base.svg'
import homepageImg from '../../assets/homepage-foto.svg'
import { MagnifyingGlass } from '@phosphor-icons/react'

export function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-end">
      <div className="flex flex-row items-center w-screen justify-start pt-16 pl-28">
        <div className="flex flex-col pr-40 justify-start">
          <h1 className="font-medium text-3xl pb-4">
            Encontre o profissional 
            <span className="text-secondary-500"> capacitado </span> <br></br> 
            para o seu serviço 
            <span className="text-secondary-500"> imediatamente.</span>
          </h1>
          <div className="pb-2"> 
            <div className="flex w-full gap-2 rounded-md bg-white px-3 py-2 border-2">
              <MagnifyingGlass size={24} className="text-disabled-500" />
              <input
                type="text"
                placeholder="Pesquisar por serviço, prestador..."
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex">
            <p className="font-medium">Mais procurados: </p>
          </div>
        </div>
        <div className="pl-40">
          <img src={homepageImg} alt="homepage-img"/>
        </div>
      </div>
      <div className="flex w-full fixed bottom-0">
        <img src={homepageBaseImg} alt="homepage-base" className="h-full w-full"/>
      </div>
    </div>
  )
}
