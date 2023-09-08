import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function BandAddForm(props) {
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

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState([]);
  const [city, setCity] = useState("");
  const [foundationDate, setFoundationDate] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setGenre(selectedGenres);
  };

  const handleCityChange = (e) => setCity(e.target.value);
  const handleFoundationDateChange = (e) => setFoundationDate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post("/band/create", {
        name,
        city,
        genre,
        foundationDate,
      });
      console.log("nueva banda creada", response);
      navigate(`/band/${response.data._id}/details`);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      navigate("/error");
    }
  };

  return (
    <div>
      <Container>
        <h3 className="editBandTitle">Crear Nueva Banda</h3>
        <Form className="formBand" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label className="profileBandLabel">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleNameChange}
                  value={name}
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label className="profileBandLabel margenMedium">
                  Ciudad
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleCityChange}
                  value={city}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="genre">
                <Form.Label className="profileBandLabel">
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
              <Form.Group controlId="foundationDate">
                <Form.Label className="profileBandLabel">
                  Fecha de Creación
                </Form.Label>
                <Form.Control
                  type="date"
                  name="foundationDate"
                  onChange={handleFoundationDateChange}
                  value={foundationDate}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className="margenTop" type="submit">
            Crear
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default BandAddForm;
