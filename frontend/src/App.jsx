import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ModifyCab from "./Pages/ModifyCab";
import NavBar from "./Components/NavBar";
import Booking from "./Pages/Booking";
function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/edit" element={<ModifyCab />}></Route>
          <Route exact path="/history" element={<Booking />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
