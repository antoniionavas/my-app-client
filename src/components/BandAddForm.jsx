import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

function BandAddForm(props) {

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [genre, setGenre] = useState([]);
  const [city, setCity] = useState("");
  const [foundationDate, setFoundationDate] = useState("");


  const handleNameChange = (e) => setName(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleFoundationDateChange = (e) => setFoundationDate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await service.post("/banda", { name, city, genre, foundationDate })

      console.log("nueva banda creada")
      props.getData()
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  
  return (
    <div>
      <h3>Crear Banda</h3>

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
          name="genre"
          onChange={handleGenreChange}
          value={genre}
        />

        <br />

 
        <label htmlFor="foundationDate">Foundation Band Date</label>
        <input
          type="date"
          name="foundationDate"
          onChange={handleFoundationDateChange}
          value={foundationDate}
        />

        <br />

        <button type="submit">Crear</button>
        
      </form>
    </div>
  );
}

export default BandAddForm;