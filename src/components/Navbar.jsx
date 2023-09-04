import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { useNavigate } from 'react-router-dom'

function NavBar() {

  const {isUserActive, verifyToken} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem("authToken")
    verifyToken() //verifica un token que no existe para reiniciar 
    navigate("/login")
  }

  return (
    <div>

    <Link to="/">Home</Link>

    {isUserActive === true
    ? (
        <>
          <Link to="/private">Página privada</Link>
          <Link to="/user/bandFav">Bandas Fav</Link>
          <Link to="/offer">Ofertas</Link>
          <Link to="/my-profile">Mi Perfil</Link>
          <button onClick={handleLogOut}>Cerrar Sesión</button>
        </>     
      )
    :

      (
        <>
          <Link to="/signup">Registro</Link>
          <Link to="/login">Acceso</Link>       
        </>     
      )
    }
    </div>
  )
}

export default NavBar