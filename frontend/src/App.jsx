// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import './App.css';

function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignIn />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
