import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setFormError('');
    
    const { email, password } = formData;
    const result = await login(email, password);
    
    if (!result.success) {
      setFormError(result.message || 'Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <h2 className="text-center fw-bold mb-4">Login to Your Account</h2>
              
              {(error || formError) && (
                <Alert variant="danger">
                  {formError || error}
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your password.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <div className="d-grid">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </Form>
              
              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account? <Link to="/register" className="text-primary fw-bold">Register here</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage; 