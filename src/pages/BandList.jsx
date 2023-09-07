import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

function BandList() {
    const navigate = useNavigate()
    const params = useParams()

    const [ allBands, setAllBands ] = useState()
  
    useEffect(() => {
      getData()
    }, [])
  
    const getData = async () => {
      try {
        const response = await service.get("/band")
        setAllBands(response.data)
  
      } catch (error) {
        console.log(error)
        navigate("/error")
      }
    }
    

    const handleDeleteBand = async (bandId) => {
      try {
        
        await service.delete(`/band/${bandId}`)
        console.log(`${bandId}`)
        getData()
  
      } catch (error) {
        console.log(error)
        navigate("/error")
      }
    }

    if (allBands === undefined) {
      return <h3>...buscando lista de bandas</h3>
    }
  
    return (
      <div>
        <table>
          <thead>
            <h3>Lista de Bandas</h3>
            <tr>
              <th>Nombre</th>
              <th>Género</th>
              <th>Ciudad</th>
              <th>Fecha de Fundación</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {allBands === undefined ? (
              <tr>
                <td colSpan="4">... buscando Bandas</td>
              </tr>
            ) : (
              allBands.map((eachBand) => {
                return (
                  <tr key={eachBand._id}>
                    <td>
                      <Link to={`/band/${eachBand._id}/details`}>{eachBand.name}</Link>
                    </td>
                    <td>{eachBand.genre}</td>
                    <td>{eachBand.city}</td>
                    <td>{format(new Date(eachBand.foundationDate), "dd-MM-yyyy")}</td>
                    <td><button onClick={() => handleDeleteBand(eachBand._id)}>Borrar</button></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
}

export default BandList