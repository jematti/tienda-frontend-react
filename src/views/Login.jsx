import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([]);
  const {login} = useAuth({
    middlware: 'guest',
    url: '/',
  })

  const handleSubmit = async (e) => {
    // ✅ Evita que el navegador recargue la página al enviar el formulario
    e.preventDefault();

    // 📦 Recolecta los datos ingresados por el usuario usando las referencias (refs)
    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    //enviamos al hook
    login(datos, setErrores)
  };

  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sesion</h1>
      <p>Para crear un pedido iniciar Sesion</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} novalidate>
          {errores
            ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
            : null}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">
              Email :
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              name="email"
              placeholder="Tu email"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password">
              Password :
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password"
              placeholder="Tu password"
              ref={passwordRef}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/registro">No tienes Cuenta, Crea Una!</Link>
      </nav>
    </>
  );
}
