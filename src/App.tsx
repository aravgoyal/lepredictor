import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Predict } from "./pages/Predict"
import { Login } from "./pages/Login"
import { UserProvider } from './Context/useAuth';
import LoginPage from './pages/Loginpage/LoginPage';


function App() {

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App
