'use client';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarRutasSabor() {
  const [userId, setUserId] = useState(null);
  const [inicial, setInicial] = useState('?');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.id);
      setInicial(storedUser.name?.charAt(0).toUpperCase() || '?');
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ backgroundColor: '#111827' }}>
      <Container>
        <Navbar.Brand href="/home">
          <img
            src="/multimedia/Logo.png"
            alt="Logo"
            width="80"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav><h4>Rutas del Sabor</h4></Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/agregar-Platos-Page">Agregar Plato</Nav.Link>
            <Nav.Link href="/agregar-Locales-Page">Agregar Local</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link href={userId ? `/perfilPage/${userId}` : "#"} className="d-flex align-items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-indigo-500 transition">
                {inicial}
              </div>
              <h6>Ver perfil</h6>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}