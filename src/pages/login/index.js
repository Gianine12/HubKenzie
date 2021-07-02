import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";

import Cabecalho from "../../components/cabecalho";
import ButtonGrenn from "../../components/button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
      backgroundColor: "#fff",
      color: "#aaa",
    },
  },
}));

const Login = () => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Minimo de 8 dígitos")
      .matches(
        /^(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número!"
      )
      .required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido").required("Campo Obrigatório"),
  });

  const history = useHistory();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handlDate = (data) => {
    console.log(data);
    axios
      .post("https://kenziehub.me/sessions", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(response.data.token));
        reset();
        history.push("/");
      })
      .catch((e) => console.log(e));
  };

  const classes = useStyles();
  return (
    <>
      <Cabecalho />
      <Container
        fixed
        className="box"
        style={{ width: "47ch", margin: "auto", height: "auto" }}
      >
        <form onSubmit={handleSubmit(handlDate)} className={classes.root}>
          <h1>Login</h1>
          <div>
            <TextField
              name="email"
              label="E-mail"
              type="email"
              variant="outlined"
              inputRef={register}
              error={!!errors.email} //ternario simplificado
              helperText={errors.email?.message}
            />
          </div>
          <div>
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              inputRef={register}
              error={!!errors.password} //ternario simplificado
              helperText={errors.password?.message}
            />
          </div>
          <Button
            style={{ width: "45ch", margin: "7px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
