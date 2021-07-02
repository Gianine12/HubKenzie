import Cabecalho from "../../components/cabecalho";
import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Home = ({ isAuth, setIsAuth }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    if (!localToken) {
      return "";
    }
    setIsAuth(true);
    return JSON.parse(localToken);
  });

  useEffect(() => {
    axios
      .get("https://kenziehub.me/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch((e) => console.log(e));
  }, []);

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Cabecalho isAuth={isAuth} setIsAuth={setIsAuth} />
      <div style={{ border: "1px solid black", borderRadius: "20px" }}>
        <h1>Bem-Vindo {user.name}</h1>
        <div>E-mail: {user.email}</div>
        <div>Módulo do Curso: {user.course_module}</div>
        <div>Contato: {user.contact}</div>
        <div>Descrição: {user.bio}</div>
        {/* <span>Tecnologias: {user.techs}</span> */}
      </div>
    </>
  );
};

export default Home;
