import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config.js";
import { uploadImageService } from "../services/upload.services.js";
import moment from "moment";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function UserEdit() {
  const musicGenre = [
    "Bachata",
    "Country",
    "Flamenco",
    "Funk",
    "Góspel",
    "Hip hop",
    "Jazz",
    "Música Clásica",
    "Metal",
    "Pop",
    "Reggae",
    "Reggaetón",
    "Rock",
    "Salsa",
    "Techno",
  ];
  const typeOffer = ["Bailarín", "Cantante", "Músico"];

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [genre, setGenre] = useState([]);
  const [offerType, setOfferType] = useState([]);
  const [city, setCity] = useState("");
  const [dateborn, setDateborn] = useState(moment().format("YYYY-MM-DD"));

  const handleImgUpload = async (event) => {
    console.log("El archivo a actualizar es: ", event.target.files[0]);

    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);
      setProfileImg(response.data.profileImg);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleUserNameChange = (e) => setUsername(e.target.value);

  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setGenre(selectedGenres);
  };

  const handleOfferTypeChange = (e) => {
    const selectedOfferTypes = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setOfferType(selectedOfferTypes);
  };
  const handleCityChange = (e) => setCity(e.target.value);

  const onChangeDate = (date) => {
    console.log(date.target.value);
    setDateborn(moment(date.target.value).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/user/my-profile");
      console.log(response);
      setUsername(response.data.username);
      setProfileImg(response.data.profileImg);
      setGenre(response.data.genre || []);
      setOfferType(response.data.offerType || []);
      setCity(response.data.city);
      let dateRightFormat = moment(response.data.dateborn).format("YYYY-MM-DD");
      setDateborn(dateRightFormat);
      console.log(response.data.dateborn);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put("/user/update", {
        username,
        profileImg,
        genre,
        city,
        dateborn,
        offerType,
      });

      navigate("/my-profile");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <Container>
        <h3 className="profileUserTitle">Editar Usuario</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group controlId="username">
                <Form.Label className="infoUserContent">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={handleUserNameChange}
                  value={username}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="profileImg">
                <Form.Label className="infoUserContent">
                  Imágen de Perfil
                </Form.Label>
                <Form.Control
                  type="file"
                  name="profileImg"
                  disabled={isUploading}
                  onChange={handleImgUpload}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="city">
                <Form.Label className="infoUserContent">Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleCityChange}
                  value={city}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group controlId="genre">
                <Form.Label className="infoUserContent margenTop">
                  Género Musical
                </Form.Label>
                <Form.Select
                  type="text"
                  name="genre"
                  value={genre}
                  multiple
                  onChange={handleGenreChange}
                >
                  {Object.values(musicGenre).map((eachGenre) => (
                    <option key={eachGenre} value={eachGenre}>
                      {eachGenre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="offerType">
                <Form.Label className="infoUserContent margenTop">
                  Formación
                </Form.Label>
                <Form.Select
                  type="text"
                  name="offerType"
                  value={offerType}
                  multiple
                  onChange={handleOfferTypeChange}
                >
                  {Object.values(typeOffer).map((eachOffer) => (
                    <option key={eachOffer} value={eachOffer}>
                      {eachOffer}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="dateborn">
                <Form.Label className="infoUserContent margenTop">
                  Fecha de Nacimiento
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dateborn"
                  onChange={onChangeDate}
                  value={dateborn}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" className="margenTop">
            Actualizar
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default UserEdit;
