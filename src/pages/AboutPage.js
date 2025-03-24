import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaAward, FaClock } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';

const AboutPage = () => {
  const stats = [
    { icon: <FaUsers className="text-primary mb-3" size={40} />, value: '5,000+', label: 'Happy Customers' },
    { icon: <FaAward className="text-primary mb-3" size={40} />, value: '20+', label: 'Years Experience' },
    { icon: <FaClock className="text-primary mb-3" size={40} />, value: '24/7', label: 'Customer Support' }
  ];

  const team = [
    { name: 'John Doe', position: 'CEO & Founder', image: 'https://via.placeholder.com/300' },
    { name: 'Jane Smith', position: 'Chief Technician', image: 'https://via.placeholder.com/300' },
    { name: 'Robert Johnson', position: 'Customer Relations', image: 'https://via.placeholder.com/300' }
  ];

  return (
    <>
      <HeroSection 
        title="About CoolAir" 
        subtitle="Your trusted air conditioning maintenance service provider"
        buttonText="Our Services"
        buttonLink="/services"
      />
      
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">Our Story</h2>
              <p className="mb-4">
                CoolAir was founded in 2003 with a simple mission: to provide reliable, affordable air conditioning 
                maintenance services to homeowners and businesses alike. Our founder, John Doe, recognized the need 
                for proactive AC maintenance after working as a repair technician for over a decade.
              </p>
              <p className="mb-4">
                What started as a small local business has grown into a trusted service provider with thousands of 
                satisfied customers. We've built our reputation on quality workmanship, honest pricing, and exceptional 
                customer service.
              </p>
              <p>
                Today, our subscription-based maintenance service helps our customers save money while ensuring their 
                air conditioning systems run efficiently all year round. We're proud to be the region's leading AC 
                maintenance provider.
              </p>
            </Col>
            <Col lg={6}>
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="CoolAir Team" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>

          <Row className="py-4">
            {stats.map((stat, index) => (
              <Col md={4} className="text-center mb-4 mb-md-0" key={index}>
                {stat.icon}
                <h3 className="fw-bold">{stat.value}</h3>
                <p className="text-muted">{stat.label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold">Our Team</h2>
              <p className="text-muted">Meet the experts behind our excellent service</p>
            </Col>
          </Row>
          <Row>
            {team.map((member, index) => (
              <Col md={4} className="mb-4" key={index}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Img variant="top" src={member.image} />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold">{member.name}</Card.Title>
                    <Card.Text className="text-muted">{member.position}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="fw-bold mb-4">Our Mission</h2>
              <p className="lead mb-0">
                To provide exceptional air conditioning maintenance services that extend the life of your equipment, 
                improve energy efficiency, and ensure your comfort through every season, all while delivering 
                unmatched value through our subscription model.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutPage; 