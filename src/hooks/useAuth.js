import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useSWR from 'swr';

export const useAuth = ({middlware, url}) => {
        //obtenemos el token
        const token= localStorage.getItem('AUTH_TOKEN');
        const navigate = useNavigate();
        //utilizamos uSWR
        const {data:user, error, mutate} =useSWR('api/user', () => 
            clienteAxios('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })

        )
 
      const login = async (datos, setErrores) => {
    
        try {
            const { data } = await clienteAxios.post("/api/login", datos);
            //console.log(data.token)
            localStorage.setItem("AUTH_TOKEN", data.token);
            setErrores([])
            await mutate()
            } catch (error) {
            console.error(error); // Para depuración

            if (error.response && error.response.data && error.response.data.errors) {
                // Errores de validación (422) o estructura esperada
                setErrores(Object.values(error.response.data.errors));
            } else if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                // Error con mensaje genérico (500, 401, etc.)
                setErrores([error.response.data.message]);
            } else {
                // Cualquier otro error (red, servidor caído, etc.)
                setErrores(["Ocurrió un error inesperado. Intenta de nuevo."]);
            }
            }

      }  
      const registro = async(datos, setErrores) => {
         try {
            // 🚀 Envía los datos al servidor mediante una petición POST asíncrona
            // El `await` hace que el código espere la respuesta antes de continuar
            const {data} = await clienteAxios.post('/api/registro', datos)
        
            //console.log(data.token)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
            //redirecciona temporal revisar *    
            navigate('/');
          } catch (error) {
          
        
          if (error.response && error.response.data && error.response.data.errors) {
            // Errores de validación (422) o estructura esperada
            setErrores(Object.values(error.response.data.errors));
          } else if (error.response && error.response.data && error.response.data.message) {
            // Error con mensaje genérico (500, 401, etc.)
            setErrores([error.response.data.message]);
          } else {
            // Cualquier otro error (red, servidor caído, etc.)
            setErrores(['Ocurrió un error inesperado. Intenta de nuevo.']);
          }
        }
      }  
      const logout = async() => {
        try {
            await clienteAxios.post("/api/logout", null,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
      }  

      //console.log(user)
      //console.log(error)

      useEffect(()=>{
        //validacion de login  si hay un usuario lo redirecciona
        if(middlware === 'guest' && url && user ){
         navigate(url)
        }
        //validar para proteger la ruta
        if(middlware === 'auth' && error){
         navigate('/auth/login')
        }

      },[user, error])

      return {
        login,
        registro,
        logout,
        user,
        error,
      }
}