import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import moment from "moment";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';


function EditBand() {

  const musicGenre = ["Bachata", "Country", "Flamenco", "Funk", "Góspel", "Hip hop", "Jazz", "Música Clásica", "Metal", "Pop", "Reggae", "Reggaetón", "Rock", "Salsa", "Techno"];

  const params = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [genre, setGenre] = useState([]);
  const [city, setCity] = useState("");
  const [foundationDate, setFoundationDate] = useState(moment().format('YYYY-MM-DD'));


  const handleNameChange = (e) => setName(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenre(selectedGenres);
  };

  const onChangeDate = (date) => {
    console.log(date.target.value)
   setFoundationDate(moment(date.target.value).format("YYYY-MM-DD"));
    };


  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      const response = await service.get(`/band/${params.id}/details`)
      console.log(`${params.id}`)
      console.log(response)
      setName(response.data.name)
      setGenre(response.data.genre || [])
      setCity(response.data.city)
      let dateRightFormat = moment(response.data.foundationDate).format('YYYY-MM-DD')
      setFoundationDate(dateRightFormat)
      console.log(response.data.foundationDate)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await service.put(`/band/${params.id}/edit`, {
        name, city, genre, foundationDate
      })

      navigate(`/band/${params.id}/details`)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  };

  return (
    <div>
      {/* <h3>Editar Banda</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />

        <br />

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          onChange={handleCityChange}
          value={city}
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

 
        <label htmlFor="foundationDate">Foundation Band Date</label>
        <input
          type="date"
          name="foundationDate"
          onChange={onChangeDate}
          value={foundationDate}
        />

        <br />

        <button type="submit">Editar</button>
        
      </form> */}

<Container >
      <h3 className="editBandTitle">Editar Banda</h3>
      <Form className="editBandForm" onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label className="infoBandContent margenTop">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleNameChange}
                value={name}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label className="infoBandContent margenTopMax">Ciudad</Form.Label>
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
              <Form.Label className="infoBandContent margenTop">Género Musical</Form.Label>
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
              <Form.Label className="infoBandContent margenTop">Fecha de Creación</Form.Label>
              <Form.Control
                type="date"
                name="foundationDate"
                onChange={onChangeDate}
                value={foundationDate}
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

export default EditBand;