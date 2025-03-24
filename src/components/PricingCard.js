import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PricingCard = ({ title, price, features, isFeatured, link }) => {
  return (
    <Card className={`pricing-card h-100 ${isFeatured ? 'featured' : ''}`}>
      {isFeatured && (
        <div className="text-center position-absolute w-100">
          <Badge bg="primary" className="px-3 py-2 rounded-pill text-white">
            Most Popular
          </Badge>
        </div>
      )}
      <Card.Header className={`text-center py-4 ${isFeatured ? 'bg-primary text-white' : ''}`}>
        <h4 className="mb-0">{title}</h4>
      </Card.Header>
      <Card.Body className="text-center">
        <h2 className="mb-4">
          ${price}
          <small className="text-muted fw-light">/month</small>
        </h2>
        <ul className="list-unstyled">
          {features.map((feature, index) => (
            <li key={index} className="mb-3">
              {feature}
            </li>
          ))}
        </ul>
      </Card.Body>
      <Card.Footer className="text-center bg-transparent border-0 pb-4">
        <Button 
          as={Link} 
          to={link || "/register"} 
          variant={isFeatured ? "primary" : "outline-primary"} 
          size="lg" 
          className="w-75"
        >
          Subscribe Now
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PricingCard; 