import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";

function UserEdit() {

  const params = useParams()
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [genre, setGenre] = useState([]);
  const [offerType, setOfferType] = useState([]);
  const [city, setCity] = useState("");
  const [dateborn, setDateborn] = useState("");


  const handleUserNameChange = (e) => setUsername(e.target.value);
  const handleProfileImgChange = (e) => setProfileImg(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleOfferTypeChange = (e) => setOfferType(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleDatebornChange = (e) => setDateborn(e.target.value);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/user/${params.id}`)
      console.log(response)
      setUsername(response.data.username)
      setProfileImg(response.data.profileImg)
      setGenre(response.data.genre)
      setOfferType(response.data.offerType)
      setCity(response.data.city)
      setDateborn(response.data.dateborn)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await service.put(`/user/${params.id}`, {
        username, profileImg, genre, city, dateborn, offerType
      })

      navigate(`/user/${params.id}/details`)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  };

  return (
    <div>
      <h3>Editar Usuario</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input
          type="text"
          name="username"
          onChange={handleUserNameChange}
          value={username}
        />

        <br />

        <label htmlFor="profileImg">Imagen de Perfil</label>
        <input
          type="file"
          name="profileImg"
          onChange={handleProfileImgChange}
          value={profileImg}
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

        <label htmlFor="offerType">OfferType</label>
        <select
          name="offerType"
          onChange={handleOfferTypeChange}
          value={offerType}
        />

        <br />


        <label htmlFor="dateborn">Dateborn</label>
        <input
          type="date"
          name="dateborn"
          onChange={handleDatebornChange}
          value={dateborn}
        />

        <br />

        <button type="submit">Editar</button>
        
      </form>
    </div>
  );
}

export default UserEdit;