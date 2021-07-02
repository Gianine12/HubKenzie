import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Cabecalho = ({ isAuth, setIsAuth }) => {
  const classes = useStyles();
  const history = useHistory();

  const sendTo = (path) => {
    history.push(path);
  };

  const handleClose = () => {
    localStorage.clear();
    setIsAuth(false);
    sendTo("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ width: "100vw" }}>
        <Toolbar>
          {isAuth ? (
            <>
              <MenuItem onClick={() => sendTo("/cadastroTech")}>
                Cadastro Tecnologias
              </MenuItem>
              <MenuItem disabled>Cadastro Trabalhos</MenuItem>

              <div style={{ marginLeft: "auto", display: "flex" }}>
                <MenuItem onClick={() => sendTo("/")}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </div>
            </>
          ) : (
            <>
              <MenuItem onClick={() => sendTo("/login")}>Login</MenuItem>
              <MenuItem onClick={() => sendTo("/cadastro")}>Cadastro</MenuItem>
              <MenuItem onClick={() => sendTo("/usuarios")}>Usuarios</MenuItem>
              <h1 style={{ margin: "0px auto" }}>Bem Vindo ao KenziHub</h1>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Cabecalho;
