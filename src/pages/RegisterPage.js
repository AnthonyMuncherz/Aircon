import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        setPasswordMatch(value === formData.confirmPassword || formData.confirmPassword === '');
      } else {
        setPasswordMatch(value === formData.password);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      setFormError('Passwords do not match');
      setValidated(true);
      return;
    }
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setFormError('');
    
    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (!result.success) {
      setFormError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <h2 className="text-center fw-bold mb-4">Create Your Account</h2>
              
              {(error || formError) && (
                <Alert variant="danger">
                  {formError || error}
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your first name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your last name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="email">
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
                        Please provide a valid email address.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+60 12-345 6789"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={validated && (!formData.password || !passwordMatch)}
                        placeholder="••••••••"
                        minLength={6}
                      />
                      <Form.Control.Feedback type="invalid">
                        {!formData.password 
                          ? 'Please provide a password.' 
                          : !passwordMatch 
                            ? 'Passwords do not match.' 
                            : 'Password must be at least 6 characters.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={validated && (!formData.confirmPassword || !passwordMatch)}
                        placeholder="••••••••"
                      />
                      <Form.Control.Feedback type="invalid">
                        {!formData.confirmPassword 
                          ? 'Please confirm your password.' 
                          : 'Passwords do not match.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Check
                    required
                    id="terms"
                    label={
                      <span>
                        I agree to the <Link to="/terms" target="_blank">Terms of Service</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>
                      </span>
                    }
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>
                
                <div className="d-grid">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </Form>
              
              <div className="text-center mt-4">
                <p className="mb-0">
                  Already have an account? <Link to="/login" className="text-primary fw-bold">Login here</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage; 