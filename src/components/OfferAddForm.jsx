import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

function OfferAddForm(props) {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [offerType, setOfferType] = useState([]);
  const [salary, setSalary] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleOfferTypeChange = (e) => setOfferType(e.target.value);
  const handleSalaryChange = (e) => setSalary(e.target.value);
  const handleFinalDateChange = (e) => setFinalDate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await service.post("/offer", { title, description, genre, salary, finalDate, offerType })

      console.log("oferta nueva creada")
      props.getData()
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  
  return (
    <div>
      <h3>Crear Oferta</h3>

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


        <label htmlFor="finalDate">Final Offer Date</label>
        <input
          type="date"
          name="finalDate"
          onChange={handleFinalDateChange}
          value={finalDate}
        />

        <br />

        <button type="submit">Crear</button>
        
      </form>
    </div>
  );
}

export default OfferAddForm;