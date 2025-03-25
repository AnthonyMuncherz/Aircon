import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';

const ContactPage = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Here we would normally handle the form submission to an API
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }

    setValidated(true);
  };

  return (
    <>
      <HeroSection 
        title="Contact Us" 
        subtitle="Get in touch with our team for any questions or service requests"
        buttonText="View Services"
        buttonLink="/services"
      />
      
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={4} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">Get In Touch</h2>
              <p className="text-muted mb-5">
                Have questions about our subscription services or need to schedule a maintenance? 
                Our customer service team is here to help you with all your air conditioning needs throughout Malaysia.
              </p>
              
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 text-primary">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h5 className="mb-1">Phone</h5>
                  <p className="text-muted">+60 3-2345 6789</p>
                </div>
              </div>
              
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 text-primary">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="text-muted">info@coolcareservices.com.my</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start">
                <div className="me-3 text-primary">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h5 className="mb-1">Address</h5>
                  <p className="text-muted">
                    123 Jalan Sejuk<br />
                    Taman Nyaman, 50450 Kuala Lumpur
                  </p>
                </div>
              </div>
            </Col>
            
            <Col lg={8}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-lg-5">
                  <h3 className="fw-bold mb-4">Send Us a Message</h3>
                  
                  {submitStatus === 'success' && (
                    <Alert variant="success" onClose={() => setSubmitStatus(null)} dismissible>
                      Your message has been sent successfully. We'll get back to you soon!
                    </Alert>
                  )}
                  
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="formName">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ahmad Bin Abdullah"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide your name.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="formEmail">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ahmad@example.com"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="formPhone">
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
                      
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="formSubject">
                          <Form.Label>Subject</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Service Inquiry"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a subject.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-4" controlId="formMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="How can we help you?"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your message.
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <div className="d-grid">
                      <Button type="submit" variant="primary" size="lg">
                        Send Message
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContactPage; 