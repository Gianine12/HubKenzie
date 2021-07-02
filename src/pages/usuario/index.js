import Cabecalho from "../../components/cabecalho";
import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../../components/cards";

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(true);

  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    if (!localToken) {
      return "";
    }
    return JSON.parse(localToken);
  });

  useEffect(() => {
    axios
      .get("https://kenziehub.me/users")
      .then((response) => setUsers(response.data), setLoad(false))
      .catch((e) => console.log(e));
  }, [token]);

  if (load) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Cabecalho />
      <h1>Usuarios</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {users.map((element, index) => (
          <div key={index}>
            <Cards
              s
              name={element.name}
              email={element.email}
              contact={element.contact}
              bio={element.bio}
              techs={element.techs}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Usuarios;
