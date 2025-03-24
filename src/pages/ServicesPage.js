import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaTools, FaWrench, FaSnowflake, FaClipboardCheck, FaWind } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';

const ServicesPage = () => {
  const services = [
    {
      title: 'Regular Maintenance',
      description: 'Keep your AC running efficiently with our scheduled maintenance service. We clean filters, check refrigerant levels, and ensure all components are functioning properly.',
      icon: <FaTools className="text-primary mb-4" size={50} />
    },
    {
      title: 'Emergency Repairs',
      description: 'When your AC breaks down, our technicians are available 24/7 to get your system back up and running quickly with minimal disruption.',
      icon: <FaWrench className="text-primary mb-4" size={50} />
    },
    {
      title: 'System Installation',
      description: 'Looking for a new AC system? Our experts will help you choose the right unit for your space and ensure proper installation for optimal performance.',
      icon: <FaSnowflake className="text-primary mb-4" size={50} />
    },
    {
      title: 'Performance Check',
      description: 'Our comprehensive performance evaluation identifies potential issues before they become major problems, saving you money on repairs.',
      icon: <FaClipboardCheck className="text-primary mb-4" size={50} />
    },
    {
      title: 'Air Quality Control',
      description: 'Improve the air quality in your home or office with our specialized services that remove pollutants and allergens from your AC system.',
      icon: <FaWind className="text-primary mb-4" size={50} />
    }
  ];

  return (
    <>
      <HeroSection 
        title="Our Services" 
        subtitle="Professional air conditioning maintenance and repair services"
        buttonText="View Pricing"
        buttonLink="/pricing"
      />
      
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold">Comprehensive AC Services</h2>
              <p className="text-muted">We offer a full range of air conditioning services to meet all your cooling needs</p>
            </Col>
          </Row>
          
          <Row>
            {services.map((service, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="h-100 service-card border-0 shadow-sm">
                  <Card.Body className="p-4 text-center">
                    {service.icon}
                    <Card.Title className="fw-bold mb-3">{service.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {service.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">Our Service Process</h2>
              <div className="mb-4">
                <h5 className="fw-bold">1. Schedule an Appointment</h5>
                <p className="text-muted">Choose a convenient time through our online booking system or by calling our customer service.</p>
              </div>
              <div className="mb-4">
                <h5 className="fw-bold">2. Professional Inspection</h5>
                <p className="text-muted">Our certified technicians will thoroughly examine your AC system to identify any issues.</p>
              </div>
              <div className="mb-4">
                <h5 className="fw-bold">3. Maintenance or Repair</h5>
                <p className="text-muted">We'll perform the necessary maintenance or repairs using high-quality parts and tools.</p>
              </div>
              <div>
                <h5 className="fw-bold">4. Final Testing</h5>
                <p className="text-muted">We'll test your system to ensure it's operating at peak efficiency before we leave.</p>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="AC Maintenance Process" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ServicesPage; 