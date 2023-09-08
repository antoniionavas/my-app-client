import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function BandDetails() {
  const [bandDetails, setBandDetails] = useState();
  const [isBandFav, setIsBandFav] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  console.log("esto es params", params);

  useEffect(() => {
    getData();
    checkIfBandIsFav();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/band/${params.id}/details`);
      console.log(response);
      setBandDetails(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const checkIfBandIsFav = async () => {
    try {
      const response = await service.get("/user/my-profile");
      console.log("funcion comprobar si es fav", response);
      setIsBandFav(response.data.bandFav);
      console.log("mostrando si hay bandas fav", response.data.bandFav);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBandFav = async () => {
    try {
      await service.post(`/user/${params.id}/fav`);
      console.log("esta es mi banda fav", `${params.id}`);
      setIsBandFav(true);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDeleteBandFav = async () => {
    try {
      if (isBandFav) {
        await service.post(`/user/${params.id}/delete`);
        setIsBandFav(false);
      } else {
        await service.post(`/user/${params.id}/fav`);
        setIsBandFav(true);
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/band/${params.id}`);
      navigate("/bands");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  console.log("detalles de la banda", bandDetails);

  if (bandDetails === undefined) {
    return <h3>...buscando detalles de la Banda</h3>;
  }

  return (
    <div>
      <Container>
        <h3 className="profileBandTitle">Detalles de Banda</h3>
        <Row className="bandDetails">
          <Col md={3}>
            <Form.Label className="profileBandLabel">Nombre </Form.Label>
            <p className="infoBandContent">{bandDetails.name}</p>
            <Form.Label className="profileBandLabel">Propietario</Form.Label>
            <p className="infoBandContent">{bandDetails.owner.username}</p>
            <Form.Label className="profileBandLabel">
              Fecha de Creación
            </Form.Label>
            <p className="infoBandContent">
              {format(new Date(bandDetails.foundationDate), "dd-MM-yyyy")}
            </p>
          </Col>
          <Col md={3}>
            <Form.Label className="profileBandLabel">
              Género Músical{" "}
            </Form.Label>
            <p className="infoBandContent">{bandDetails.genre}</p>
            <Form.Label className="profileBandLabel">Ciudad</Form.Label>
            <p className="infoBandContent">{bandDetails.city}</p>
          </Col>
          <Col md={3}>
            <div className="d-flex flex-column align-items-center">
              <Link to={`/band/${bandDetails._id}/edit`}>
                <button className="btn btn-primary margenTop">
                  Editar Banda
                </button>
              </Link>
              <Link to={`/band/${bandDetails._id}/createOffer`}>
                <button className="btn btn-primary margenTop">
                  Crear Oferta
                </button>
              </Link>
              {isBandFav ? (
                <button
                  className="btn btn-primary margenTop"
                  onClick={handleDeleteBandFav}
                >
                  Quitar de Favoritas
                </button>
              ) : (
                <button
                  className="btn btn-primary margenTop"
                  onClick={handleBandFav}
                >
                  Añadir a Favoritas
                </button>
              )}
              <button
                className="btn btn-primary margenTop"
                onClick={handleDelete}
              >
                Borrar
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BandDetails;
