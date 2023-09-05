import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

function BandDetails() {

  const [ bandDetails, setBandDetails ] = useState()
 
  const params = useParams()
  const navigate = useNavigate()

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

  const handleDelete = async () => {
    try {
      
      await service.delete(`/band/${params.id}`)
      navigate("/band")

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  if (bandDetails === undefined) {
    return <h3>...buscando detalles de la Banda</h3>
  }

  return (
    <div>
      <h3>Detalles de la Banda</h3>

      <div>
        <h3>{bandDetails.name}</h3>
        <p>{bandDetails.components}</p>
        <p>{bandDetails.genre}</p>
        <p>{bandDetails.owner}</p>
        <p>{bandDetails.city}</p>
        <p>{bandDetails.offerType}</p>
        <p>{format(new Date(bandDetails.foundationDate), "dd-MM-yyyy")}</p>
        
        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/band/${params.id}/edit`}>
          <button>Ir a Editar</button>
        </Link>
        <Link to={"/offer/create"}>
          <button>Crear Oferta</button>
        </Link>
      </div>
    </div>
  );
}

export default BandDetails;