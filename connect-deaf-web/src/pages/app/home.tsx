import homeImage from '../../assets/home-image.svg'

export function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1>
          Encontre o profissional capacitado para o seu serviço imediatamente.
        </h1>
        <input type="text" />
        <div className="flex">
          <p>Mais procurados:</p>
          <div className="bg-primary-300 text-secondary-300 hover:bg-primary-500">
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
          </div>
        </div>
      </div>
      <img src={homeImage} alt="Home" />
    </div>
  )
}
