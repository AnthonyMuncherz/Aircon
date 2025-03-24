import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSection = ({ 
  title = "Professional Air Conditioning Maintenance", 
  subtitle = "Keep your AC running efficiently all year round with our subscription plans", 
  buttonText = "View Plans", 
  buttonLink = "/pricing" 
}) => {
  return (
    <div className="hero-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <h1 className="display-4 fw-bold mb-4">{title}</h1>
            <p className="lead mb-5">{subtitle}</p>
            <Button 
              as={Link} 
              to={buttonLink} 
              size="lg" 
              variant="primary" 
              className="px-5 py-3"
            >
              {buttonText}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection; 