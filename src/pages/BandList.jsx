import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

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
       
        <h3>Lista de Bandas</h3>
  
        {allBands === undefined
        ? <h3>... buscando Bandas</h3>
        : allBands.map((eachBand) => {
          return (
            <div key={eachBand._id}>
              <Link to={`/band/${eachBand._id}/details`}>{eachBand.name}</Link>
            </div>
          )
        })
        }
      </div>
    );
}

export default BandList