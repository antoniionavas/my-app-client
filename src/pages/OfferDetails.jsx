import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function OfferDetails(props) {
  const [offerDetails, setOfferDetails] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { isUserActive } = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    checkIsSubcriber();
  }, []);

  const checkIsSubcriber = async () => {
    try {
      if (offerDetails) {
        const currentUser = isUserActive;
        const isUserSubscribed = offerDetails.subscribers.some(
          (user) => user._id === currentUser._id
        );
        setIsSubscribed(isUserSubscribed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await service.get(`/offer/${params.id}/details`);
      console.log("response offerdetails", response.data);
      setOfferDetails(response.data);
      checkIsSubcriber();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleAddSubscribe = async (offerId) => {
    try {
      if (isSubscribed) {
        await service.post(`/offer/${offerId}/subscribers/delete`);
        setIsSubscribed(false);
      } else {
        await service.post(`/offer/${offerId}/subscribers`);
        setIsSubscribed(true);
      }

      getData();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/offer/${params.id}`);
      navigate("/offers");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (offerDetails === undefined) {
    return <h3>...buscando detalles de la Oferta</h3>;
  }

  return (
    <div>
      <Container>
        <h3 className="profileOfferTitle">Detalles de la Oferta</h3>
        <Row>
          <Col md={4}>
            <Form.Label className="profileOfferLabel">Banda</Form.Label>
            <Link to={`/band/${offerDetails.band._id}/details`}>
              <p className="infoOfferContent">{offerDetails.band.name}</p>
            </Link>
            <Form.Label className="profileOfferLabel">Título</Form.Label>
            <p className="infoOfferContent">{offerDetails.title}</p>
            <Form.Label className="profileOfferLabel">Descripción</Form.Label>
            <p className="infoOfferContent">{offerDetails.description}</p>
            <Form.Label className="profileOfferLabel">
              Fecha de Publicación
            </Form.Label>
            <p className="infoOfferContent">
              {format(new Date(offerDetails.initialDate), "dd-MM-yyyy")}
            </p>
          </Col>
          <Col md={4}>
            <Form.Label className="profileOfferLabel">
              Género Musical
            </Form.Label>
            <p className="infoOfferContent">{offerDetails.genre}</p>
            <Form.Label className="profileOfferLabel">Salario</Form.Label>
            <p className="infoOfferContent">{offerDetails.salary}</p>
            <Form.Label className="profileOfferLabel">Formación</Form.Label>
            <p className="infoOfferContent">{offerDetails.offerType}</p>
            <Form.Label className="profileOfferLabel">
              Fecha de Finalización
            </Form.Label>
            <p className="infoOfferContent">
              {format(new Date(offerDetails.finalDate), "dd-MM-yyyy")}
            </p>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-center">
            <Button className="margenTop" onClick={handleDelete}>
              Eliminar Oferta
            </Button>
            <Button
              className="margenTop"
              onClick={() => handleAddSubscribe(offerDetails._id)}
            >
              {isSubscribed ? "Desuscribirse" : "Subscribirse"}
            </Button>
            <Link to={`/offer/${offerDetails._id}/edit`}>
              <Button className="margenTop">Editar Oferta</Button>
            </Link>
          </Col>
        </Row>
        <div>
          <h3 className="profileOfferTitle">Subscriptores de la Oferta</h3>
          {offerDetails.subscribers.map((eachUser) => (
            <p className="infoOfferContent">{eachUser.username}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default OfferDetails;
