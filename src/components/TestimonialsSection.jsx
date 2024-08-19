// src/components/TestimonialsSection.jsx
import './../assets/Css/componentsCss/TestimonialsSection.css';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jean Dupont',
      role: 'Chef de projet',
      text: 'CollabPro a transformé notre manière de gérer les projets. La collaboration en temps réel est fluide et intuitive.',
    },
    {
      id: 2,
      name: 'Marie Durand',
      role: 'Développeuse',
      text: 'La fonctionnalité de planification est très utile. J’apprécie la facilité avec laquelle nous pouvons suivre l’évolution des tâches.',
    },
    {
      id: 3,
      name: 'Paul Martin',
      role: 'Responsable marketing',
      text: 'Un outil exceptionnel pour gérer les équipes et les projets. Je recommande vivement CollabPro à toute entreprise.',
    },
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-content">
        <h2>Témoignages</h2>
        <div className="testimonials-carousel">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">{testimonial.text}</p>
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
