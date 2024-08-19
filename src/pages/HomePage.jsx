import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import './../assets/Css/pagesCss/HomePage.css';
const HomePage = () => {
  return (
    <div className="homepage">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
