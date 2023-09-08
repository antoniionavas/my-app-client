import { useState } from "react";
import service from "../services/service.config"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Form, FormControl, Button, Alert } from 'react-bootstrap';


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
    <h1 className="loginTitle">Inicio de Sesión</h1>
    <Form onSubmit={handleLogin} className="formLogin">
      <Form.Label className="loginLabel">Email:</Form.Label>
      <FormControl
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />

      <Form.Label className="loginLabel">Contraseña:</Form.Label>
      <FormControl
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <Button className="loginButton" variant="primary" type="submit">
        Acceder
      </Button>

      {errorMessage && (
        <Alert variant="danger">
          {errorMessage}
        </Alert>
      )}
    </Form>
  </div>

  );
}

export default Login;