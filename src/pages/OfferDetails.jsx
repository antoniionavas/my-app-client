import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

function OfferDetails() {

  const [ offerDetails, setOfferDetails ] = useState()
 
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/offer/${params.id}/details`)
      console.log("response offerdetails",response.data)
      setOfferDetails(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleSubscribe = async (offerId) => {
    try {
      
      await service.post(`/offer/${offerId}/subscribers`)
      console.log("id de la oferta", offerId)
      navigate("/offers")
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleDelete = async () => {
    try {
      
      await service.delete(`/offer/${params.id}`)
      navigate("/offers")

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
        <label>Banda</label>
        <Link to={`/band/${offerDetails.band._id}/details`}>
        <p>{offerDetails.band.name}</p>
        </Link>
        <label>Descripción:</label>
        <p>{offerDetails.description}</p>
        <label>Género:</label>
        <p>{offerDetails.genre}</p>
        <label>Salario:</label>
        <p>{offerDetails.salary}</p>
        <label>Tipo de Oferta:</label>
        <p>{offerDetails.offerType}</p>
        <label>Fecha de Publicación:</label>
        <p>{format(new Date(offerDetails.initialDate), "dd-MM-yyyy")}</p>
        <label>Fecha de Finalización:</label>
        <p>{format(new Date(offerDetails.finalDate), "dd-MM-yyyy")}</p>
  
        <button onClick={handleDelete}>Borrar</button>
        <br/>
        <button onClick={() => handleSubscribe(offerDetails._id)}>Inscribirse</button>
        <br/>
        <Link to={`/offer/${offerDetails._id}/edit`}>
          <button>Ir a Editar</button>
        </Link>

      </div>

      <div>
        <h3>Subscriptores de la Oferta</h3>
        {offerDetails.subscribers.map((eachUser) => {
            return <p>{eachUser.username}</p>
            })
          }
      </div>
    </div>
  );
}

export default OfferDetails;