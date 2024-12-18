import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AnnoncePage from './pages/AnnoncePage';
import ServicesPage from './pages/ServicesPage';
import AnnonceDetailPage from './pages/AnnonceDetailPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/announcements" element={<AnnoncePage />} />
        <Route path="/services/*" element={<ServicesPage />} />
        <Route path="/annonce/:id" element={<AnnonceDetailPage />} />
      </Routes>
      <Footer />
    </Router>


  )
}

export default App
