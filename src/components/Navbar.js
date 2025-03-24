import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import { FaAirFreshener, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <BootstrapNavbar 
      bg="light" 
      expand="lg" 
      sticky="top" 
      className="shadow-sm"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaAirFreshener className="me-2 text-primary" />
          <span className="fw-bold">CoolAir</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onClick={() => setExpanded(false)}>
            <Nav.Link as={Link} to="/" className={isActive('/')}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className={isActive('/about')}>About</Nav.Link>
            <Nav.Link as={Link} to="/services" className={isActive('/services')}>Services</Nav.Link>
            <Nav.Link as={Link} to="/pricing" className={isActive('/pricing')}>Pricing</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={isActive('/contact')}>Contact</Nav.Link>
          </Nav>
          <Nav onClick={() => setExpanded(false)}>
            <Nav.Link as={Link} to="/login" className={isActive('/login')}>
              <Button variant="outline-primary" size="sm" className="me-2">
                Login
              </Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className={isActive('/register')}>
              <Button variant="primary" size="sm" className="d-flex align-items-center">
                <FaUser className="me-1" size={12} />
                Register
              </Button>
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar; 