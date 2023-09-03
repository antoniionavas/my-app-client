import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

function BandEdit() {

  const params = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [genre, setGenre] = useState([]);
  const [city, setCity] = useState("");
  const [foundationDate, setFoundationDate] = useState("");


  const handleNameChange = (e) => setName(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleFoundationDateChange = (e) => setFoundationDate(e.target.value);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/band/${params.id}`)
      console.log(response)
      setName(response.data.name)
      setGenre(response.data.genre)
      setCity(response.data.city)
      setFoundationDate(response.data.foundationDate)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await service.put(`/band/${params.id}`, {
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

        <button type="submit">Editar</button>
        
      </form>
    </div>
  );
}

export default BandEdit;