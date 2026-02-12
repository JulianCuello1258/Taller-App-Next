import { useState } from 'react';
import { register } from '../api/api';
import { login } from '../api/api';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Row, Col } from 'react-bootstrap';

export default function Login() {

  // Iniciar Sesión
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(loginUsername, loginPassword);
    console.log("Inicio de Sesión Exitoso");
  } // Al apretar Onclick del boton, lo loguea en la base de datos
  // Onclick(handleLogin)


  // Crear Cuenta
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegistrar = async (e) => {
    e.preventDefault();
    await register(username, name, password);
    console.log("Registrado Correctamente");
  } // Al apretar Onclick del boton, lo registra en la base de datos
  // Onclick(handleRegistrar)

  return (
    <>
      <Container>
        <Row className="justify-content-end">

          {/* Inicio de Sesión */}
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-login">
                Iniciar sesión
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-3" style={{ width: "320px" }}>
                <h2 className="text-xl font-bold text-center mb-4">
                  Iniciar Sesión
                </h2>

                <form className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Usuario
                    </label>
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Tu usuario"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    onClick={handleLogin}
                  >
                    Iniciar Sesión
                  </button>
                </form>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {/* Crear Cuenta */}
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-register">
                Registrarse
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-3" style={{ width: "320px" }}>
                <h2 className="text-xl font-bold text-center mb-4">
                  Crear Cuenta
                </h2>

                <form className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Usuario
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Tu usuario"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    onClick={handleRegistrar}
                  >
                    Registrarse
                  </button>
                </form>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

        </Row>
      </Container>
    </>
  );
}