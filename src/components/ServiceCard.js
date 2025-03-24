import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, icon, link }) => {
  return (
    <Card className="service-card h-100">
      <Card.Body className="d-flex flex-column">
        <div className="text-center mb-3">
          {icon && <div className="icon-circle">{icon}</div>}
        </div>
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Text className="text-muted mb-4">{description}</Card.Text>
        <div className="mt-auto text-center">
          <Button 
            as={Link} 
            to={link || "/services"} 
            variant="outline-primary"
          >
            Learn More
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard; 