import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';


function OfferAddForm() {
  const musicGenre = ["Bachata", "Country", "Flamenco", "Funk", "Góspel", "Hip hop", "Jazz", "Música Clásica", "Metal", "Pop", "Reggae", "Reggaetón", "Rock", "Salsa", "Techno"];
  const typeOffer = ["Bailarín", "Cantante", "Músico"];
  const params = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [offerType, setOfferType] = useState([]);
  const [salary, setSalary] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenre(selectedGenres);
  };

  const handleOfferTypeChange = (e) => {
    const selectedOfferTypes = Array.from(e.target.selectedOptions, (option) => option.value);
    setOfferType(selectedOfferTypes);
  };
  
  const handleSalaryChange = (e) => setSalary(e.target.value);
  const handleFinalDateChange = (e) => setFinalDate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await service.post(`/offer/${params.bandId}/details/createOffer`, { title, description, genre, salary, finalDate, offerType })
      console.log("oferta nueva creada")
      navigate(`/offer/${response.data._id}/details`)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  
  return (
    <div>
      {/* <h3>Crear Oferta</h3>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />

        <br />

        <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />

        <br />

        <label>Salary</label>
        <input
          type="text"
          name="salary"
          onChange={handleSalaryChange}
          value={salary}
        />

        <br />

        <label>Genre</label>
        <select
          type="text"
          name="genre"
          value={genre}
          multiple
          onChange={handleGenreChange}>
            {Object.values(musicGenre).map((eachGenre) => (
          <option key={eachGenre} value={eachGenre}>
            {eachGenre}
          </option>
            ))}
        </select>

        <br />

        <label>OfferType</label>
        <select
          type="text"
          name="offerType"
          value={offerType}
          multiple
          onChange={handleOfferTypeChange}>
            {Object.values(typeOffer).map((eachOffer) => (
          <option key={eachOffer} value={eachOffer}>
            {eachOffer}
          </option>
        ))}
        </select>

        <br />


        <label>Final Offer Date</label>
        <input
          type="date"
          name="finalDate"
          onChange={handleFinalDateChange}
          value={finalDate}
        />

        <br />

        <button type="submit">Crear</button>
        
      </form> */}

<Container>
      <h3 className="profileOfferTitle">Crear Nueva Oferta</h3>
      <Form className="createOfferForm" onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label className="profileOfferLabel">Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleTitleChange}
                value={title}
              />
            </Form.Group>

            <Form.Group controlId="genre">
              <Form.Label className="profileOfferLabel">Género Musical</Form.Label>
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
            
            <Form.Group controlId="salary">
              <Form.Label className="profileOfferLabel">Salario</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                onChange={handleSalaryChange}
                value={salary}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
                <Form.Group controlId="description">
              <Form.Label className="profileOfferLabel">Descripción</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={handleDescriptionChange}
                value={description}
              />
            </Form.Group>

            <Form.Group controlId="offerType">
              <Form.Label className="profileOfferLabel">Formación</Form.Label>
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
            <Form.Group controlId="finalDate">
              <Form.Label className="profileOfferLabel">Fecha de Finalización</Form.Label>
              <Form.Control
                type="date"
                name="finalDate"
                onChange={handleFinalDateChange}
                value={finalDate}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button className="margenTop" type="submit">Crear</Button>
      </Form>
    </Container>

    </div>
  );
}

export default OfferAddForm;