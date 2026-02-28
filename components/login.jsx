'use client';
import { useState } from 'react';
import { register } from '../api/api';
import { login } from '../api/api';
import AlertMessage from './AlertMessage';
import { useRouter } from 'next/navigation';

export default function Login() {

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [vrLoginAlert, setVrLoginAlert] = useState(false);
  const [vrRegisterAlert, setVrRegisterAlert] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const router = useRouter();

const handleLogin = async (e) => {
  e.preventDefault();
  const data = await login(loginUsername, loginPassword);
  if (data?.token) {
    setVrLoginAlert(true);
    setTimeout(() => router.push('/home'), 1000);
  }
};

const handleRegistrar = async (e) => {
  e.preventDefault();
  const data = await register(username, name, password);
  if (data?.token) {
    setVrRegisterAlert(true);
    setTimeout(() => router.push('/home'), 1000);
  }
};

  return (
    <>
      <AlertMessage
        show={vrLoginAlert}
        onClose={() => setVrLoginAlert(false)}
        variant="success"
        message="Usuario logueado correctamente"
        duration={5000}
      />
      <AlertMessage
        show={vrRegisterAlert}
        onClose={() => setVrRegisterAlert(false)}
        variant="success"
        message="Usuario registrado correctamente"
        duration={5000}
      />

      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#111827' }}>        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="/multimedia/Logo.png"
          alt="Rutas del Sabor"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          {showRegister ? "Crear cuenta" : "Iniciar sesión"}
        </h2>
      </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          {/* Formulario Login */}
          {!showRegister && (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-100">Usuario</label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    placeholder="Tu usuario"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-100">Contraseña</label>
                <div className="mt-2">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          )}

          {/* Formulario Registro */}
          {showRegister && (
            <form className="space-y-6" onSubmit={handleRegistrar}>
              <div>
                <label className="block text-sm font-medium text-gray-100">Nombre</label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Tu nombre"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-100">Usuario</label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Tu usuario"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-100">Contraseña</label>
                <div className="mt-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
                >
                  Registrarse
                </button>
              </div>
            </form>
          )}

          {/* Toggle entre login y registro */}
          <p className="mt-10 text-center text-sm text-gray-400">
            {showRegister ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{"  "}
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="font-semibold text-indigo-400 hover:text-indigo-300 bg-transparent border-none cursor-pointer"
            >
              {showRegister ? "Iniciá sesión" : "Registrate"}
            </button>
          </p>

        </div>
      </div>
    </>
  );
}