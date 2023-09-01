import { useState } from "react";
import service from "../services/service.config"
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [genre, setGenre] = useState("");
  const [offerType, setOfferType] = useState("")
  const [dateborn, setDateBorn] = useState("")
  const [city, setCity] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleOfferTypeChange = (e) => setOfferType(e.target.value);
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

      <h1>Regístrate</h1>
    
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
          onChange={handleGenreChange}
        />

        <br />

        <label>Tipo de Oferta:</label>
        <select
          type="text"
          name="offerType"
          value={offerType}
          onChange={handleOfferTypeChange}
        />

        <br />

        <label>Fecha Nacimiento:</label>
        <input
          type="text"
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

      </form>
      
    </div>
  );
}

export default Signup;