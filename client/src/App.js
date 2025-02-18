import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TenderForm from "./pages/TenderForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Prising from "./pages/Prising";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import About from "./pages/About";
import TenderDetailPage from './pages/TenderDetailPage';
import { AuthProvider } from "./components/AuthContext"; 
import PersonalTender from "./pages/PersonalTender";
import ComparativePage from './pages/ComparativePage';
import TenderDetails from './pages/TenderDetail';
import TenderQuotations from "./pages/TenderQuotations";
import ProtectedRoute from './components/ProtectedRoute'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prising" element={<Prising />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
        
          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} />}
          />
          <Route
            path="/new-tender"
            element={<ProtectedRoute element={TenderForm} />}
          />
          <Route
            path="/tender-details/:id"
            element={<ProtectedRoute element={TenderDetails} />}
          />
          <Route
            path="/personal-tenders"
            element={<ProtectedRoute element={PersonalTender} />}
          />
          <Route
            path="/tender/:tenderId"
            element={<ProtectedRoute element={TenderDetailPage} />}
          />
          <Route
            path="/tender/:tenderId/quotations"
            element={<ProtectedRoute element={TenderQuotations} />}
          />
          <Route
            path="/tender/:tenderId/comparative"
            element={<ProtectedRoute element={ComparativePage} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
