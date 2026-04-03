import useTienda from "../hooks/useTienda"

export default function Categoria({categoria}) {
    const {handleClickCategoria, categoriaActual} = useTienda();
    const{icono, id, nombre}= categoria

    //metodo de resaltar usando una funcion `${resaltarCategoriaActual()}`
    //const resaltarCategoriaActual = () => categoriaActual.id === id ? 'bg-amber-400': 'bg-white'
  return (
    <div 
    className={`${categoriaActual.id === id ? "bg-amber-400": 'bg-white'}
    flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
        <img 
        src={`/img/icono_${icono}.svg`}
        alt="Imagen Icono" 
        className="w-12"
        />
        <button 
        className="text-lg font-bold cursor-pointer"
        type="button"
        onClick={() => handleClickCategoria(id)}
        >
          {nombre}
        </button>
        </div>
  )
}
