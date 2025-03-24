import React from 'react';
import { Card } from 'react-bootstrap';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialCard = ({ name, position, content, rating }) => {
  return (
    <Card className="testimonial-card h-100 border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="mb-3 text-primary">
          <FaQuoteLeft size={30} />
        </div>
        <Card.Text className="mb-4">{content}</Card.Text>
        <div className="d-flex mb-3">
          {Array.from({ length: rating }).map((_, index) => (
            <FaStar key={index} className="text-warning me-1" />
          ))}
        </div>
        <div className="d-flex align-items-center">
          <div>
            <h5 className="mb-0">{name}</h5>
            <p className="text-muted mb-0">{position}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TestimonialCard; 