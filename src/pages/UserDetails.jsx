import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";

function UserDetails() {

  const [ userDetails, setUserDetails ] = useState()
 
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/user/${params.id}`)
      console.log(response)
      setUserDetails(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleDelete = async () => {
    try {
      
      await service.delete(`/user/${params.id}`)
      navigate("/user")

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
        
        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/user/${params.id}/edit`}>
          <button>Ir a Editar Perfil</button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetails;