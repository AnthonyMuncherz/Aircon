import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <FaExclamationTriangle size={80} className="text-warning mb-4" />
          <h1 className="display-4 mb-4">Page Not Found</h1>
          <p className="lead mb-5">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Return to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage; 