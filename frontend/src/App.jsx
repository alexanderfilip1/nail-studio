import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import "animate.css";

import "./App.css";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<Appointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
