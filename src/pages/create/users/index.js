import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cabecalho from "../../../components/cabecalho";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "36vw",
      backgroundColor: "#fff",
    },
    "& .MuiFormControl-root": {
      width: "360px",
      margin: theme.spacing(1),
      backgroundColor: "#fff",
    },
  },
}));

const CreateUsers = () => {
  const classes = useStyles();
  const [mod, setMod] = useState("");

  const handleChange = (event) => {
    setMod(event.target.value);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Campo Obrigatório"),
    password: yup
      .string()
      .min(8, "Minimo de 8 dígitos")
      .matches(
        /^(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número!"
      )
      .required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido").required("Campo Obrigatório"),
    bio: yup.string().required("Campo Obrigatório"),
    contact: yup.string().required("Campo Obrigatório"),
    course_module: yup.string().required("Campo Obrigatório"),
  });

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const handlDate = (data) => {
    console.log(data);
    axios
      .post("https://kenziehub.me/users", data)
      .then((response) => {
        reset();
        history.push("/login");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Cabecalho />
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
          <h1 style={{ color: "black" }}>Cadastro</h1>
          <div>
            <TextField
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              inputRef={register}
              error={!!errors.name} //ternario simplificado
              helperText={errors.name?.message}
            />
          </div>
          <div>
            <TextField
              name="password"
              label="Password"
              type="text"
              variant="outlined"
              inputRef={register}
              error={!!errors.password} //ternario simplificado
              helperText={errors.password?.message}
            />
          </div>
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
              name="bio"
              label="Descrição"
              type="text"
              variant="outlined"
              inputRef={register}
              error={!!errors.bio} //ternario simplificado
              helperText={errors.bio?.message}
            />
          </div>
          <div>
            <TextField
              name="contact"
              label="Contato"
              type="text"
              variant="outlined"
              inputRef={register}
              error={!!errors.contact} //ternario simplificado
              helperText={errors.contact?.message}
            />
          </div>
          <div>
            <FormControl variant="outlined">
              <InputLabel id="select-label">Módulo do Curso</InputLabel>
              <Select
                name="course_module"
                labelId="select-label"
                id="course_module"
                value={mod}
                onChange={handleChange}
                label="Módulo do Curso"
                inputRef={register}
                native
              >
                <option value={null}></option>
                <option value={"Primeiro módulo (Introdução ao Frontend)"}>
                  Primeiro módulo (Introdução ao Frontend)
                </option>
                <option value={"Segundo módulo (Frontend Av"}>
                  Segundo módulo (Frontend Avançado)
                </option>
                <option value={"Terceiro módulo (Introdução ao Backend)"}>
                  Terceiro módulo (Introdução ao Backend)
                </option>
                <option value={"Quarto módulo (Backend Avançado)"}>
                  Quarto módulo (Backend Avançado)
                </option>
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

export default CreateUsers;
