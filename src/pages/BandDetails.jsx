import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

function BandDetails() {

  const [ bandDetails, setBandDetails ] = useState()
  const params = useParams()
  const navigate = useNavigate()
console.log("esto es params",params)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/band/${params.id}/details`)
      console.log(response)
      setBandDetails(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  
  const handleBandFav = async (bandId) => {
    try {
      
      await service.post(`/user/${bandId}/fav`)
      console.log(`${bandId}`)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }


  const handleDelete = async () => {
    try {
      
      await service.delete(`/band/${params.id}`)
      navigate("/bands")

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  console.log("detalles de la bandela", bandDetails)

  if (bandDetails === undefined) {
    return <h3>...buscando detalles de la Banda</h3>
  }

  return (
    <div>
      <h3>Detalles de la Banda</h3>

      <div>
        <h3>{bandDetails.name}</h3>
        <p>{bandDetails.components}</p>
        <label>Género:</label>
        <p>{bandDetails.genre}</p>
        <label>Creador</label>
        <p>{bandDetails.owner.username}</p>
        <label>Ciudad</label>
        <p>{bandDetails.city}</p>
        <label>Fundación</label>
        <p>{format(new Date(bandDetails.foundationDate), "dd-MM-yyyy")}</p>
        
        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/band/${bandDetails._id}/edit`}>
          <button>Ir a Editar</button>
        </Link>
        <button onClick={() => handleBandFav(bandDetails._id)}>Agregar Band Fav</button>
        <Link to={`/${params.id}/details/createOffer`}>
          <button>Crear Oferta</button>
        </Link>
      </div>
    </div>
  );
}

export default BandDetails;