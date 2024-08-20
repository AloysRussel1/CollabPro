import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AnnoncePage from './pages/AnnoncePage';
import ServicesPage from './pages/ServicesPage';
import Dashboard from './pages/Dashboard';



function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/announcements" element={<AnnoncePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/dashboard" element={<Dashboard />} />



    </Routes>
    <Footer />
  </Router>

   
  )
}

export default App
