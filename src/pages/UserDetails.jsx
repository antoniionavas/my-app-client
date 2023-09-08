import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';


function UserDetails() {
  
  const [ userDetails, setUserDetails ] = useState()
 
  const params = useParams()
  console.log(params)
  console.log(params.id)
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get("/user/my-profile")
      console.log(response)
      setUserDetails(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  
  if (userDetails === undefined) {
    return <h3>...buscando detalles del Usuario</h3>
  }

  return (
    <div>
          <Container>
            <h3 className="profileUserTitle">Detalles del Usuario</h3>
            <Row>
              <Col md={4}>
                <Image className="profileImg" src={userDetails.profileImg} width={200} alt={userDetails.username} />
              </Col>
              <Col md={2}>
              <Form.Label className="profileUserLabel">Nombre</Form.Label>
                <p className="infoUserContent">{userDetails.username}</p>
                <Form.Label className="profileUserLabel">Email</Form.Label>
                <p className="infoUserContent">{userDetails.email}</p>
                <Form.Label className="profileUserLabel">Género Musical</Form.Label>
                <p className="infoUserContent">{userDetails.genre}</p>
              </Col>
              <Col md={2}>
                <Form.Label className="profileUserLabel">Ciudad</Form.Label>
                <p className="infoUserContent">{userDetails.city}</p>
                <Form.Label className="profileUserLabel">Fecha Nacimiento</Form.Label>
                <p className="infoUserContent">{format(new Date(userDetails.dateborn), "dd-MM-yyyy")}</p>
                <Form.Label className="profileUserLabel">Formación</Form.Label>
                <p className="infoUserContent">{userDetails.offerType}</p>
              </Col>
              <Col md={4}>
                <Link to="/update">
                  <Button>Editar Perfil</Button>
                </Link>
                <Link to="/band/create">
                  <Button>Nueva Banda</Button>
                </Link>
              </Col>
            </Row>
            <hr className="hrHome"/>
            <Row>
              <Col>
                <div>
                  <h3 className="profileUserTitle">Bandas Favoritas</h3>
                  {userDetails.bandFav.map((eachBand) => (
                    <div key={eachBand._id} className="infoUserContent">
                      <Link to={`/band/${eachBand._id}/details`}>{eachBand.name}</Link>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
    </div>
  );
}

export default UserDetails;