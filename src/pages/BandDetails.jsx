import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

function BandDetails() {

  const [ bandDetails, setBandDetails ] = useState()
  const [isBandFav, setIsBandFav] = useState(false)

  const params = useParams()
  const navigate = useNavigate()
  console.log("esto es params",params)

  useEffect(() => {
    getData();
    checkIfBandIsFav();
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

  const checkIfBandIsFav = async () => {
    try {
      const response = await service.get("/user/my-profile");
      console.log("funcion comprobar si es fav", response)
      setIsBandFav(response.data.bandFav);
      console.log("mostrando si hay bandas fav", response.data.bandFav)
    } catch (error) {
      console.log(error);
    }
  }

  
  const handleBandFav = async () => {
    try {
      
      await service.post(`/user/${params.id}/fav`)
      console.log("esta es mi banda fav",`${params.id}`)
      setIsBandFav(true)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleDeleteBandFav = async () => {
    try {
      
     if (isBandFav) {
        // Si ya es favorita, elimínala
        await service.post(`/user/${params.id}/delete`);
        setIsBandFav(false); // Desmarcar la banda como favorita
      } else {
        // Si no es favorita, agrégala
        await service.post(`/user/${params.id}/fav`);
        setIsBandFav(true); // Marcar la banda como favorita
      }

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

  console.log("detalles de la banda", bandDetails)

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
       
        {isBandFav ? (
          <button onClick={handleDeleteBandFav}>Quitar Band Fav</button>
        ) : (
          <button onClick={handleBandFav}>Agregar Band Fav</button>
        )}
        <Link to={`/${params.id}/details/createOffer`}>
          <button>Crear Oferta</button>
        </Link>
      </div>
    </div>
  );
}

export default BandDetails;