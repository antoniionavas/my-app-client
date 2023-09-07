import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import moment from "moment";

function OfferEdit() {

  
  const musicGenre = ["Bachata", "Country", "Flamenco", "Funk", "Góspel", "Hip hop", "Jazz", "Música Clásica", "Metal", "Pop", "Reggae", "Reggaetón", "Rock", "Salsa", "Techno"];
  const typeOffer = ["Bailarín", "Cantante", "Músico"];

  const params = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [offerType, setOfferType] = useState([]);
  const [salary, setSalary] = useState("");
  const [finalDate, setFinalDate] = useState(moment().format('YYYY-MM-DD'));


  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenre(selectedGenres);
  };
  const handleOfferTypeChange = (e) => {
    const selectedOfferTypes = Array.from(e.target.selectedOptions, (option) => option.value);
    setOfferType(selectedOfferTypes);
  };
  const handleSalaryChange = (e) => setSalary(e.target.value);

  const onChangeDate = (date) => {
    console.log(date.target.value)
   setFinalDate(moment(date.target.value).format("YYYY-MM-DD"));
  };
   

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/offer/${params.id}/details`)
      console.log(response)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setGenre(response.data.genre || [])
      setOfferType(response.data.offerType || [])
      setSalary(response.data.salary)
      let dateRightFormat = moment(response.data.finalDate).format('YYYY-MM-DD')
      setFinalDate(dateRightFormat)
      console.log(response.data.finalDate)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await service.put(`/offer/${params.id}`, {
        title, description, genre, salary, finalDate, offerType
      })

      navigate(`/offer/${params.id}/details`)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  };

  return (
    <div>
      <h3>Editar Oferta</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />

        <br />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />

        <br />

        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          name="salary"
          onChange={handleSalaryChange}
          value={salary}
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


        <label htmlFor="finalDate">Final Offer Date</label>
        <input
          type="date"
          name="finalDate"
          onChange={onChangeDate}
          value={finalDate}
        />

        <br />

        <button type="submit">Editar</button>
        
      </form>
    </div>
  );
}

export default OfferEdit;