import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

function OfferList() {

  const navigate = useNavigate()

  const [ allOffers, setAllOffers ] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get("/offer")
      console.log(response.data)
      setAllOffers(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  return (
    <div>
     
      <h3>Lista de Ofertas</h3>

      {allOffers === undefined
      ? <h3>... buscando Ofertas</h3>
      : allOffers.map((eachOffer) => {
        return (
          <div key={eachOffer._id}>
            <Link to={`/offer/${eachOffer._id}/details`}>{eachOffer.title}</Link>
          </div>
        )
      })
      }
    </div>
  );
}

export default OfferList;