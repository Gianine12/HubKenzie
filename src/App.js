import "./App.css";
import Routes from "./routes";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="App">
      <Routes isAuth={isAuth} setIsAuth={setIsAuth} />
    </div>
  );
}

export default App;
