import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Cabecalho from "../../../components/cabecalho";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
      backgroundColor: "#fff",
      color: "#aaa",
    },
    "& .MuiFormControl-root": {
      width: "360px",
      margin: theme.spacing(1),
      backgroundColor: "#fff",
    },
  },
}));

const CreatTechs = ({ isAuth, setIsAuth }) => {
  //const [user, setUser] = useState({});
  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    if (!localToken) {
      return "";
    }
    setIsAuth(true);
    return JSON.parse(localToken);
  });

  const [mod, setMod] = useState("");

  const handleChange = (event) => {
    setMod(event.target.value);
  };

  const schema = yup.object().shape({
    title: yup.string().required("Campo Obrigatório"),
    status: yup.string().required("Campo Obrigatório"),
  });

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handlDate = (data) => {
    axios
      .post("https://kenziehub.me/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        reset();
        history.push("/cadastroTech");
      })
      .catch((e) => console.log(e));
  };

  const history = useHistory();
  const classes = useStyles();

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Cabecalho isAuth={isAuth} setIsAuth={setIsAuth} />
      <Container
        fixed
        style={{
          backgroundColor: "#E8E8E8",
          borderRadius: "20px",
          width: "47ch",
          height: "auto",
        }}
      >
        <form onSubmit={handleSubmit(handlDate)} className={classes.root}>
          <h1 style={{ color: "black" }}>Cadastro Tecnologias</h1>
          <div>
            <TextField
              name="title"
              label="Title"
              type="text"
              variant="outlined"
              inputRef={register}
              error={!!errors.title} //ternario simplificado
              helperText={errors.title?.message}
            />
          </div>

          <div>
            <FormControl variant="outlined">
              <InputLabel id="status">Status</InputLabel>
              <Select
                name="status"
                labelId="status"
                id="course_module"
                value={mod}
                onChange={handleChange}
                label="Status"
                inputRef={register}
                native
              >
                <option value={null}></option>
                <option value={"Iniciante"}>Iniciante</option>
                <option value={"Intermediário"}>Intermediário</option>
                <option value={"Avançado"}>Avançado</option>
              </Select>
            </FormControl>
          </div>
          <Button
            style={{ width: "45ch", margin: "7px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Cadastro
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CreatTechs;
