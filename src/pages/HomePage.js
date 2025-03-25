import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSnowflake, FaTools, FaShieldAlt, FaClock, FaStar } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';

const HomePage = () => {
  const services = [
    {
      title: 'Regular Maintenance',
      description: 'Scheduled maintenance to keep your AC running efficiently in Malaysia\'s tropical climate and prevent breakdowns.',
      icon: <FaTools className="text-primary" size={40} />,
      link: '/services'
    },
    {
      title: 'Emergency Repairs',
      description: 'Quick response to any AC emergencies with our 24/7 service team available throughout Klang Valley.',
      icon: <FaClock className="text-primary" size={40} />,
      link: '/services'
    },
    {
      title: 'Premium Protection',
      description: 'Extended warranty and protection plans for your air conditioning system to handle Malaysia\'s high humidity.',
      icon: <FaShieldAlt className="text-primary" size={40} />,
      link: '/services'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmad Razali',
      position: 'Homeowner',
      content: 'The subscription service from CoolCare has been a lifesaver during the hot Malaysian summers. My AC runs perfectly year-round with zero hassle.',
      rating: 5
    },
    {
      name: 'Sarah Lim',
      position: 'Business Owner',
      content: 'We maintain optimal temperature in our office building in KL thanks to the regular maintenance from CoolCare. Highly recommended!',
      rating: 5
    },
    {
      name: 'Michael Tan',
      position: 'Property Manager',
      content: "Managing multiple properties in Penang is easier with CoolCare's subscription service. They keep track of maintenance schedules so I don't have to.",
      rating: 4
    }
  ];

  return (
    <>
      <HeroSection 
        title="Professional Air Conditioning Maintenance"
        subtitle="Keep your AC running efficiently in Malaysia's tropical climate with our subscription plans"
        buttonText="View Plans"
        buttonLink="/pricing"
      />
      
      {/* Services Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold">Our Services</h2>
              <p className="text-muted">Keep your cooling systems in perfect condition year-round</p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => (
              <Col md={4} className="mb-4" key={index}>
                <ServiceCard {...service} />
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            <Col className="text-center">
              <Button as={Link} to="/services" variant="outline-primary">
                View All Services
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold">Why Choose Our Subscription Service</h2>
              <p className="text-muted">We make air conditioning maintenance hassle-free in Malaysia</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <div className="text-center">
                <div className="mb-3">
                  <FaSnowflake className="text-primary" size={40} />
                </div>
                <h5>Efficiency</h5>
                <p className="text-muted">Regularly maintained ACs use up to 15% less energy, saving you money on electricity</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="text-center">
                <div className="mb-3">
                  <FaTools className="text-primary" size={40} />
                </div>
                <h5>Expertise</h5>
                <p className="text-muted">Certified technicians with years of experience in Malaysian climate conditions</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="text-center">
                <div className="mb-3">
                  <FaShieldAlt className="text-primary" size={40} />
                </div>
                <h5>Protection</h5>
                <p className="text-muted">Prevent costly repairs and system failures due to Malaysia's high humidity</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="text-center">
                <div className="mb-3">
                  <FaStar className="text-primary" size={40} />
                </div>
                <h5>Convenience</h5>
                <p className="text-muted">Scheduled maintenance without you having to remember</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold">Customer Testimonials</h2>
              <p className="text-muted">What our subscribers say about our services</p>
            </Col>
          </Row>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} className="mb-4" key={index}>
                <TestimonialCard {...testimonial} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="fw-bold mb-4">Ready to Keep Your AC in Perfect Condition?</h2>
              <p className="lead mb-4">Join our subscription service today and never worry about AC maintenance again.</p>
              <Button as={Link} to="/pricing" variant="light" size="lg">
                View Subscription Plans
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomePage; 