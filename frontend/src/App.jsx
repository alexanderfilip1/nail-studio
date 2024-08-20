import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import "animate.css";

import "./App.css";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";

function App() {
  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<Appointment />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
