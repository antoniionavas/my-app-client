import { useState } from "react";
import service from "../services/service.config"
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from 'react-bootstrap';

function Signup() {

  const navigate = useNavigate()

  const musicGenre = ["Bachata", "Country", "Flamenco", "Funk", "Góspel", "Hip hop", "Jazz", "Música Clásica", "Metal", "Pop", "Reggae", "Reggaetón", "Rock", "Salsa", "Techno"];
  const typeOffer = ["Bailarín", "Cantante", "Músico"];


  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [genre, setGenre] = useState([]);
  const [offerType, setOfferType] = useState([])
  const [dateborn, setDateBorn] = useState("")
  const [city, setCity] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenre(selectedGenres);
  };

  const handleOfferTypeChange = (e) => {
    const selectedOfferTypes = Array.from(e.target.selectedOptions, (option) => option.value);
    setOfferType(selectedOfferTypes);
  };

  const handleDateBornChange = (e) => setDateBorn(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);


  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {

      await service.post("/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
        genre,
        offerType,
        dateborn,
        city
      })

      navigate("/login")

    } 
    
    catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400){
        setErrorMessage(error.response.data.errorMessage)
      } 
      else {
        navigate("/error")
      }
    }
  };

  return (
    <div>

      {/* <h1>Regístrate</h1>
    
      <form onSubmit={handleSignup}>
        
        <label>Nombre:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        <br />

        <label>Género Musical:</label>

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

        <label>Tipo de Oferta:</label>
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

        <label>Fecha Nacimiento:</label>
        <input
          type="date"
          name="dateborn"
          value={dateborn}
          onChange={handleDateBornChange}
        />

        <br />

        <label>Ciudad:</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={handleCityChange}
        />

        <br />


        <button type="submit">Inscribirse</button>

        { errorMessage ? <p>{errorMessage}</p> : null }

      </form> */}
      <h1 className="signupTitle">Regístrate</h1>
      <Form onSubmit={handleSignup} className="formSignUp">
        <Row>
          <Col md={6}>
            <Form.Group controlId="username">
              <Form.Label className="signupLabel">Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label className="signupLabel">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label className="signupLabel">Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="confirmPassword">
              <Form.Label className="signupLabel">Confirmar Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="genre">
              <Form.Label className="signupLabel">Género Musical:</Form.Label>
              <Form.Select
                name="genre"
                multiple
                value={genre}
                onChange={handleGenreChange}
                className="form-select form-select-sm"
              >
                {Object.values(musicGenre).map((eachGenre) => (
                  <option key={eachGenre} value={eachGenre}>
                    {eachGenre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="offerType">
              <Form.Label className="signupLabel">Tipo de Oferta:</Form.Label>
              <Form.Select
                as="select"
                multiple
                name="offerType"
                value={offerType}
                onChange={handleOfferTypeChange}
                className="form-select form-select-lg"
              >
                {Object.values(typeOffer).map((eachOffer) => (
                  <option key={eachOffer} value={eachOffer}>
                    {eachOffer}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="dateborn">
          <Form.Label className="signupLabel">Fecha Nacimiento:</Form.Label>
          <Form.Control
            type="date"
            name="dateborn"
            value={dateborn}
            onChange={handleDateBornChange}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label className="signupLabel">Ciudad:</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={city}
            onChange={handleCityChange}
          />
        </Form.Group>

        <Button className="signupButton" variant="primary" type="submit">
          Inscribirse
        </Button>

        {errorMessage && <p>{errorMessage}</p>}
      </Form>
    </div>
  );
}

export default Signup;