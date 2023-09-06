import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

function EditBand() {

  const musicGenre = ["Bachata", "Country", "Flamenco", "Funk", "Góspel", "Hip hop", "Jazz", "Música Clásica", "Metal", "Pop", "Reggae", "Reggaetón", "Rock", "Salsa", "Techno"];

  const params = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [genre, setGenre] = useState([]);
  const [city, setCity] = useState("");
  const [foundationDate, setFoundationDate] = useState("1999-02-10");


  const handleNameChange = (e) => setName(e.target.value);
  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenre(selectedGenres);
  };

  const handleCityChange = (e) => setCity(e.target.value);
  const handleFoundationDateChange = (e) => setFoundationDate(e.target.value);
  
  //formatear la fecha para poder mostrarla
  const dateToFormat = format(new Date(foundationDate), "yyyy-MM-dd");
  console.log("esta es mi fecha formateada",dateToFormat)

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
      setFoundationDate(response.data.foundationDate)
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
      <h3>Editar Banda</h3>

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
          onChange={handleFoundationDateChange}
          value={dateToFormat}
        />

        <br />

        <button type="submit">Editar</button>
        
      </form>
    </div>
  );
}

export default EditBand;