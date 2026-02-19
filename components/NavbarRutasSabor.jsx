'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

export default function NavbarRutasSabor() {

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
            <Nav.Link href="/perfilPage">Perfil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}