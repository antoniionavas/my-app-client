import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config.js";
import { uploadImageService } from "../services/upload.services.js";

function UserEdit() {

  const musicGenre = ["Bachata", "Country", "Flamenco", "Funk", "Góspel", "Hip hop", "Jazz", "Música Clásica", "Metal", "Pop", "Reggae", "Reggaetón", "Rock", "Salsa", "Techno"];
  const typeOffer = ["Bailarín", "Cantante", "Músico"];


  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [genre, setGenre] = useState([]);
  const [offerType, setOfferType] = useState([]);
  const [city, setCity] = useState("");
  const [dateborn, setDateborn] = useState("");

  const handleImgUpload = async (event) => {
    console.log("El archivo a actualizar es: ", event.target.files[0]);
  
    if (!event.target.files[0]) {
      return;
    }
  
    setIsUploading(true); 
  
    const uploadData = new FormData(); 
    uploadData.append("image", event.target.files[0]);
  
    try {
      const response = await uploadImageService(uploadData);
      setProfileImg(response.data.profileImg);
      setIsUploading(false); 
    } catch (error) {
      navigate("/error");
    }
  };


  const handleUserNameChange = (e) => setUsername(e.target.value);
 
  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenre(selectedGenres);
  };

  const handleOfferTypeChange = (e) => {
    const selectedOfferTypes = Array.from(e.target.selectedOptions, (option) => option.value);
    setOfferType(selectedOfferTypes);
  };
  const handleCityChange = (e) => setCity(e.target.value);
  const handleDatebornChange = (e) => setDateborn(e.target.value);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get("/user/my-profile")
      console.log(response)
      setUsername(response.data.username)
      setProfileImg(response.data.profileImg)
      setGenre(response.data.genre || [])
      setOfferType(response.data.offerType || [])
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
      
      await service.put("/user/update", {
        username, profileImg, genre, city, dateborn, offerType
      })

      navigate("/my-profile")

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
          disabled={isUploading}
          onChange={handleImgUpload}
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

        <label htmlFor="offerType">OfferType</label>
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