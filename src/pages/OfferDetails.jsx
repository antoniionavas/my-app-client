import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";

function OfferDetails() {

  const [ offerDetails, setOfferDetails ] = useState()
 
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/offer/${params.id}`)
      console.log(response)
      setOfferDetails(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleDelete = async () => {
    try {
      
      await service.delete(`/offer/${params.id}`)
      navigate("/offer")

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  if (offerDetails === undefined) {
    return <h3>...buscando detalles de la Oferta</h3>
  }

  return (
    <div>
      <h3>Detalles de la Oferta</h3>

      <div>
        <h3>{offerDetails.title}</h3>
        <p>{offerDetails.band}</p>
        <p>{offerDetails.description}</p>
        <p>{offerDetails.genre}</p>
        <p>{offerDetails.salary}</p>
        <p>{offerDetails.offerType}</p>
        <p>{offerDetails.initialDate}</p>
        <p>{offerDetails.finalDate}</p>
  
        <button onClick={handleDelete}>Borrar</button>
        <Link to={`/offer/${params.id}/edit`}>
          <button>Ir a Editar</button>
        </Link>

      </div>
    </div>
  );
}

export default OfferDetails;