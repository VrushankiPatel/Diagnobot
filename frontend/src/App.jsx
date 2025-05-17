// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";

function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignIn />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
