import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import Search from "../components/Search";
import { Form } from "react-bootstrap";

function OfferList() {
  const navigate = useNavigate();

  const [allOffers, setAllOffers] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/offer", {
        params: {
          title: searchQuery,
        },
      });
      console.log(response.data);
      setAllOffers(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleSortGenreOffer = (porTipo) => {
    console.log("intento de ordenar por género");
    let cloneOffers = JSON.parse(JSON.stringify(allOffers));
    cloneOffers.sort((offer1, offer2) => {
      if (porTipo === "genre") {
        return offer1.genre > offer2.genre ? 1 : -1;
      } else if (porTipo === "typeOffer") {
        return offer1.offerType > offer2.offerType ? -1 : 1;
      }
    });
    setAllOffers(cloneOffers);
  };

  const handleSortOfferTypeOffer = () => {
    console.log("intento de ordenar por tipo de oferta");
    let cloneOffers = JSON.parse(JSON.stringify(allOffers));
    cloneOffers.sort((offer1, offer2) => {
      return offer1.offerType > offer2.offerType ? 1 : -1;
    });
    setAllOffers(cloneOffers);
  };

  return (
    <div>
      <h3 className="searchTitle">Buscar por título: </h3>
      <Search setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <hr className="hrHome" />
      <br />
      {allOffers === undefined ? (
        <h3>... buscando Ofertas</h3>
      ) : (
        <div className="container">
          <h3 className="offerlistTitle">Lista de Ofertas</h3>
          <br />
          <br />
          <div className="row buttonSort">
            <div className="col-md-3">
              <button
                className="btn btn-primary"
                onClick={() => handleSortGenreOffer("genre")}
              >
                Ordenar Género
              </button>
            </div>
            <br />
            <div className="col-md-3">
              <button
                className="btn btn-primary"
                onClick={() => handleSortOfferTypeOffer("typeOffer")}
              >
                Ordenar Tipo
              </button>
            </div>
          </div>
          <div className="row">
            {allOffers
              .filter((eachOffer) => eachOffer.title.startsWith(searchQuery))
              .map((eachOffer) => (
                <div key={eachOffer._id} className="col-md-4 mb-4">
                  <div className="card border">
                    <div className="card-body">
                      <h4 className="card-title">
                        <Link to={`/offer/${eachOffer._id}/details`}>
                          <p className="titleOfferList">{eachOffer.title}</p>
                        </Link>
                      </h4>
                      <Form.Label className="homeOfferLabel">Género Musical</Form.Label>
                      <p className="card-text infoOfferContent">{eachOffer.genre}</p>
                      <Form.Label className="homeOfferLabel">Formación</Form.Label>
                      <p className="card-text infoOfferContent">
                        Tipo de Oferta: {eachOffer.offerType}
                      </p>
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
