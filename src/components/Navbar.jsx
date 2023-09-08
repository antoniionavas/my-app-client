import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import isAdmin from "./isAdmin";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function NavBar() {
  const { isUserActive, verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    verifyToken(); //verifica un token que no existe para reiniciar
    navigate("/login");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Info Music Job</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {isUserActive === true ? (
                <>
                  <isAdmin>
                    <Nav.Link href="/bands">Lista de Bandas</Nav.Link>
                  </isAdmin>
                  <isAdmin>
                    <Nav.Link href="/list-users">Lista de Usuarios</Nav.Link>
                  </isAdmin>
                  <Nav.Link href="/my-profile">Mi Perfil</Nav.Link>
                  <button className="LogOut btn" onClick={handleLogOut}>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Nav.Link href="/signup">Registro</Nav.Link>
                  <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
