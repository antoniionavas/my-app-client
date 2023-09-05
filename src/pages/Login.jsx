import { useState } from "react";
import service from "../services/service.config"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function Login() {

  const {verifyToken} = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
        const response = await service.post("/auth/login", {
        email,
        password        
      })

      console.log(response)
      //el token se almacena en el LocalStorage
      localStorage.setItem("authToken", response.data.authToken)
      await verifyToken()
      navigate("/my-profile")
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

      <h1>Inicia Sesión</h1>

      <form onSubmit={handleLogin}>
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

        <br />

        <button type="submit">Acceder</button>

        <br />

        { errorMessage ? <p>{errorMessage}</p> : null }


      </form>
      
    </div>
  );
}

export default Login;