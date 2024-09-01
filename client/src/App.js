import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TenderForm from "./pages/TenderForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import TenderDetailPage from './pages/TenderDetailPage';
import { AuthProvider } from "./components/AuthContext"; // Import the named export

import TenderDetails from './pages/TenderDetail';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-tender" element={<TenderForm />} />
          <Route path="/tender-details/:id" element={<TenderDetails />} />
          <Route path="/tender/:tenderId" element={<TenderDetailPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
