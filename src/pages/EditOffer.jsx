import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import moment from "moment";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';


function OfferEdit() {

  
  const musicGenre = ["Bachata", "Country", "Flamenco", "Funk", "Góspel", "Hip hop", "Jazz", "Música Clásica", "Metal", "Pop", "Reggae", "Reggaetón", "Rock", "Salsa", "Techno"];
  const typeOffer = ["Bailarín", "Cantante", "Músico"];

  const params = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [offerType, setOfferType] = useState([]);
  const [salary, setSalary] = useState("");
  const [finalDate, setFinalDate] = useState(moment().format('YYYY-MM-DD'));


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

  const onChangeDate = (date) => {
    console.log(date.target.value)
   setFinalDate(moment(date.target.value).format("YYYY-MM-DD"));
  };
   

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/offer/${params.id}/details`)
      console.log(response)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setGenre(response.data.genre || [])
      setOfferType(response.data.offerType || [])
      setSalary(response.data.salary)
      let dateRightFormat = moment(response.data.finalDate).format('YYYY-MM-DD')
      setFinalDate(dateRightFormat)
      console.log(response.data.finalDate)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await service.put(`/offer/${params.id}`, {
        title, description, genre, salary, finalDate, offerType
      })

      navigate(`/offer/${params.id}/details`)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  };

  return (
    <div>
      {/* <h3>Editar Oferta</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />

        <br />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />

        <br />

        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          name="salary"
          onChange={handleSalaryChange}
          value={salary}
        />

        <br />

        <label htmlFor="genre">Genre</label>
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

        <label htmlFor="offerType">OfferType</label>
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


        <label htmlFor="finalDate">Final Offer Date</label>
        <input
          type="date"
          name="finalDate"
          onChange={onChangeDate}
          value={finalDate}
        />

        <br />

        <button type="submit">Editar</button>
        
      </form> */}

<Container>
      <h3 className="editOfferTitle">Editar Oferta</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label className="infoOfferContent margenTop">Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleTitleChange}
                value={title}
              />
            </Form.Group>

            <Form.Group controlId="genre">
              <Form.Label className="infoOfferContent margenTop">Género Musical</Form.Label>
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
              <Form.Label className="infoOfferContent margenTop">Salario</Form.Label>
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
              <Form.Label className="infoOfferContent margenTop">Descripción</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={handleDescriptionChange}
                value={description}
              />
            </Form.Group>
            <Form.Group controlId="offerType">
              <Form.Label className="infoOfferContent margenTop">Formación</Form.Label>
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
              <Form.Label className="infoOfferContent margenTop">Fecha Final de Oferta</Form.Label>
              <Form.Control
                type="date"
                name="finalDate"
                onChange={onChangeDate}
                value={finalDate}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button className="margenTop" type="submit">Actualizar</Button>
      </Form>
    </Container>

    </div>
  );
}

export default OfferEdit;