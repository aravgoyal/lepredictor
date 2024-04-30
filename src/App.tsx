import './App.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Predict } from "./pages/Predict"
import { Login } from "./pages/Login"


function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/predict" exact component={Predict} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
