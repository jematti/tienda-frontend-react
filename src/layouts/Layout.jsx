import {Outlet} from 'react-router-dom'
import Modal from 'react-modal'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import useTienda from '../hooks/useTienda'
import ModalProducto from '../components/ModalProducto'
import { useAuth } from '../hooks/useAuth'


//estilos del modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
//añadir modal a index.html
Modal.setAppElement('#root')

export default function Layout() {

  const {user, error} = useAuth({middlware: 'auth'})
  const {modal, handleClickModal} = useTienda();

  return (
    <>

      <div className='md:flex'>

          <Sidebar />

          <main className='flex-1 h-screen overflow-y-scroll bg-gray-100'>
            <Outlet />
          </main>
          
          <Resumen />

      </div>

      {/* mostramos el modal */}
     
       <Modal isOpen={modal} style={customStyles}>
           <ModalProducto></ModalProducto>
       </Modal>

        <ToastContainer />
       
       
    </>
  )
}
