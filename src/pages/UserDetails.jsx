import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

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
        <p>{format(new Date(userDetails.dateborn), "dd-MM-yyyy")}</p>
        <p>{userDetails.offerType}</p>


        <Link to={"/update"}>
          <button>Ir a Editar Perfil</button>
        </Link>
        <Link to={"/band/create"}>
          <button>Crear una Banda</button>
        </Link>
        <br/> 
        <br/>       
        <div>
          <h3>Bandas Favoritas</h3>
          {userDetails.bandFav.map((eachBand) => {
            return <Link to={`/band/${eachBand._id}/details`}>{eachBand.name}</Link>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default UserDetails;