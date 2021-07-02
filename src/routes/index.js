import { Switch, Route } from "react-router-dom";
import Login from "../pages/login";
import CreateUsers from "../pages/create/users";
import CreatTechs from "../pages/create/techs";
import Home from "../pages/home";
import Usuarios from "../pages/usuario";
import NotFound from "../pages/notFound";

const Routes = ({ isAuth, setIsAuth }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home isAuth={isAuth} setIsAuth={setIsAuth} />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/cadastro">
        <CreateUsers />
      </Route>
      <Route exact path="/cadastroTech">
        <CreatTechs isAuth={isAuth} setIsAuth={setIsAuth} />
      </Route>
      <Route exact path="/usuarios">
        <Usuarios />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
