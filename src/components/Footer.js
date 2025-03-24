import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaAirFreshener } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto">
      <Container>
        <Row className="py-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="d-flex align-items-center mb-3">
              <FaAirFreshener className="me-2" />
              <span>CoolAir</span>
            </h5>
            <p className="text-muted">
              We provide professional air conditioning maintenance services with subscription plans that ensure your cooling systems run efficiently all year round.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">Home</Link></li>
              <li className="mb-2"><Link to="/about">About</Link></li>
              <li className="mb-2"><Link to="/services">Services</Link></li>
              <li className="mb-2"><Link to="/pricing">Pricing</Link></li>
              <li className="mb-2"><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/services">Regular Maintenance</Link></li>
              <li className="mb-2"><Link to="/services">Emergency Repairs</Link></li>
              <li className="mb-2"><Link to="/services">System Installation</Link></li>
              <li className="mb-2"><Link to="/services">Performance Check</Link></li>
              <li className="mb-2"><Link to="/services">Air Quality Control</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2">123 Cooling Street</li>
              <li className="mb-2">Air City, AC 12345</li>
              <li className="mb-2">Phone: (123) 456-7890</li>
              <li className="mb-2">Email: info@coolairservices.com</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-0 bg-light" />
        <Row>
          <Col className="text-center py-3">
            <p className="mb-0">&copy; {currentYear} CoolAir Services. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 