import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { format } from "date-fns"; //formatea la fecha

function UserList() {

  const navigate = useNavigate()

  const [ allUsers, setAllUsers ] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get("/user/list-users")
      console.log(response.data)
      setAllUsers(response.data)

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  return (
    <div>
    <table>
      <thead>
        <h3>Lista de Usuarios</h3>
        <tr>
          <th>Imagen</th>
          <th>Username</th>
          <th>Email</th>
          <th>Género</th>
          <th>Tipo de Oferta</th>
          <th>Ciudad</th>
          <th>Fecha de Nacimiento</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {allUsers === undefined ? (
          <tr>
            <td colSpan="7">... buscando</td>
          </tr>
        ) : (
          allUsers.map((eachUser) => {
            return (
              <tr key={eachUser._id}>
                <td>
                  <img src={eachUser.profileImg} width={100} alt={eachUser.username} />
                </td>
                <td>
                  <Link to={`/user/${eachUser._id}/details`}>{eachUser.username}</Link>
                </td>
                <td>{eachUser.email}</td>
                <td>{eachUser.genre}</td>
                <td>{eachUser.offerType}</td>
                <td>{eachUser.city}</td>
                <td>{format(new Date(eachUser.dateborn), "dd-MM-yyyy")}</td>
                <td><button>Eliminar</button></td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
</div>

  );
}

export default UserList;