import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

function UserList() {

  const navigate = useNavigate()

  const [ allUsers, setAllUsers ] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get("/list-users")
      console.log(response.data)
      setAllUsers(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  return (
    <div>
     
      <h3>Lista de Usuarios</h3>

      {allUsers === undefined
      ? <h3>... buscando</h3>
      : allUsers.map((eachUser) => {
        return (
          <div key={eachUser._id}>
            <Link to={`/user/${eachUser._id}/details`}>{eachUser.name}</Link>
          </div>
        )
      })
      }
    </div>
  );
}

export default UserList;