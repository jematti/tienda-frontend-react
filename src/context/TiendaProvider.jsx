import {createContext, useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const TiendaContext = createContext();

const TiendaProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido,setPedido]= useState([])
   // const [total, setTotal]  = useState(0)

    /*
    useEffect(() => {
        const nuevoTotal = pedido.reduce( (total, producto) => total + (producto.precio * producto.cantidad), 0)
        setTotal(nuevoTotal)
    }, [pedido])
*/
    // ✅ Calculamos el total en cada render, sin necesidad de estado ni efecto
    const total = pedido.reduce(
    (total, producto) => total + (producto.precio * producto.cantidad), 0)

    const obtenerCategorias = async () => {
        try{
            
            const {data} = await clienteAxios('/api/categorias')
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error){
            console.log(error)
        }
    }    

    useEffect(() => {
        obtenerCategorias();
    }, [])

    const handleClickCategoria = id => {
        //devuelve un arreglo y luego hayque volverlo objeto [0], validar si trabajar con objetos o arreglos solamente
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        //utilizar la funcion modificadora
        setCategoriaActual(categoria)    
    }
    //Para mostrar modal
    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) =>{
        //para evitar duplicados
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto: pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        }else{
             //crear un objeto nuevo y añadele el producto
             setPedido([...pedido, producto])
             toast.success('agregado el pedido')
        }
    }

    const handleEditarCantidad = id =>{
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id =>{
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Elimina el Pedido')
    }

    return (
        <TiendaContext.Provider
         value={{
            categorias, 
            categoriaActual,
            handleClickCategoria,
            modal,
            handleClickModal,
            producto,
            handleSetProducto,
            pedido,
            handleAgregarPedido,
            handleEditarCantidad,
            handleEliminarProductoPedido,
            total,
         }}
        >{children}</TiendaContext.Provider>
    )
}

export {
    TiendaProvider
}
export default TiendaContext