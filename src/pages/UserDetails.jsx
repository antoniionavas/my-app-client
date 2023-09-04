import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";

function UserDetails() {

  const [ userDetails, setUserDetails ] = useState()
 
  const params = useParams()
  console.log(params)
  console.log(params.id)
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get("/user/my-profile")
      console.log(response)
      setUserDetails(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleDelete = async () => {
    try {
      await service.delete("/user/auto-delete")
      navigate("/login")

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  if (userDetails === undefined) {
    return <h3>...buscando detalles del Usuario</h3>
  }

  return (
    <div>
      <h3>Detalles del Usuario</h3>

      <div>
        <h3>{userDetails.username}</h3>
        <p>{userDetails.email}</p>
        <p>{userDetails.genre}</p>
        <img src={userDetails.profileImg} width={150}/>
        <p>{userDetails.city}</p>
        <p>{userDetails.dateborn}</p>
        <p>{userDetails.offerType}</p>
        
        <button onClick={handleDelete}>Eliminar Cuenta</button>
        <Link to={`/user/edit-user`}>
          <button>Ir a Editar Perfil</button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetails;