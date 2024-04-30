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
      <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/predict">
            <Predict />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
      </div>
      <div>

      </div>
    </>
  )
}

export default App
