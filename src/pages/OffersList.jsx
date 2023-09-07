import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import Search from "../components/Search";

function OfferList() {

  const navigate = useNavigate()

  const [ allOffers, setAllOffers ] = useState()
  const [ searchQuery, setSearchQuery ] = useState("")
  
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

  
  const handleSortGenreOffer = (porTipo) => {
    console.log("intento de ordenar por género");
    let cloneOffers = JSON.parse(JSON.stringify(allOffers));
    cloneOffers.sort((offer1, offer2) => {
      if (porTipo === "genre") {
        return offer1.genre > offer2.genre ? 1 : -1
      } else if (porTipo === "typeOffer") {
        return offer1.offerType > offer2.offerType ? -1 : 1
      }
      
    });
    setAllOffers(cloneOffers)
  };
  
  
  const handleSortOfferTypeOffer = () => {
    console.log("intento de ordenar por tipo de oferta");
    let cloneOffers = JSON.parse(JSON.stringify(allOffers));
    cloneOffers.sort((offer1, offer2) => {
      return offer1.offerType > offer2.offerType ? 1 : -1
    });
    setAllOffers(cloneOffers)
  }
 
 
  return (
    
    <div>

      
    <hr />
    <label>Realice una búsqueda por Título: </label>
    <Search setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
   
    <hr />

    {allOffers === undefined ? (
      <h3>... buscando Ofertas</h3>
      ) : (
      <div className="container">
      <h3>Lista de Ofertas</h3>
      <div className="row">
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={() => handleSortGenreOffer("genre")}>
            Ordenar Género
          </button>
        </div>
        <br/>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={() => handleSortOfferTypeOffer("typeOffer")}>
            Ordenar Tipo
          </button>
        </div>
      </div>
      <div className="row">
          {allOffers.filter((eachOffer) => {
            return eachOffer.title.startsWith(searchQuery)})
          .map((eachOffer) => (
            <div key={eachOffer._id} className="col-md-4 mb-4">
              <div className="card border">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/offer/${eachOffer._id}/details`}>{eachOffer.title}</Link>
                  </h5>
                  <p className="card-text">Género: {eachOffer.genre}</p>
                  <p className="card-text">Tipo de Oferta: {eachOffer.offerType}</p>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
    )}
   </div>
  );
}

export default OfferList;