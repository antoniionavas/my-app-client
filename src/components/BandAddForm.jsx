import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

function BandAddForm(props) {
  
  const musicGenre = ["Bachata", "Country", "Flamenco", "Funk", "Góspel", "Hip hop", "Jazz", "Música Clásica", "Metal", "Pop", "Reggae", "Reggaetón", "Rock", "Salsa", "Techno"];

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [genre, setGenre] = useState([]);
  const [city, setCity] = useState("");
  const [foundationDate, setFoundationDate] = useState("");


  const handleNameChange = (e) => setName(e.target.value);
  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenre(selectedGenres);
  };
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

        <label>City</label>
        <input
          type="text"
          name="city"
          onChange={handleCityChange}
          value={city}
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

 
        <label>Foundation Band Date</label>
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