import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

function BandList() {
    const navigate = useNavigate()

    const [ allBands, setAllBands ] = useState()
  
    useEffect(() => {
      getData()
    }, [])
  
    const getData = async () => {
      try {
        const response = await service.get("/band")
        console.log(response.data)
        setAllBands(response.data)
  
      } catch (error) {
        console.log(error)
        navigate("/error")
      }
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
                    <td><button>Eliminar</button></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      // <div>
       
      //   <h3>Lista de Bandas</h3>
  
      //   {allBands === undefined
      //   ? <h3>... buscando Bandas</h3>
      //   : allBands.map((eachBand) => {
      //     return (
      //       <div key={eachBand._id}>
      //         <Link to={`/band/${eachBand._id}/details`}>{eachBand.name}</Link>
      //         <p>{eachBand.genre}</p>
      //         <p>{eachBand.city}</p>
      //         <p>{eachBand.foundationDate}</p>
      //       </div>
      //     )
      //   })
      //   }
      // </div>
    );
}

export default BandList