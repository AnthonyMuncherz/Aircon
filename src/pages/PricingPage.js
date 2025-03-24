import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PricingCard from '../components/PricingCard';
import HeroSection from '../components/HeroSection';

const PricingPage = () => {
  const pricingPlans = [
    {
      title: 'Basic',
      price: '29.99',
      features: [
        'Bi-annual AC maintenance',
        'Filter replacements',
        'Basic system health check',
        'Email support',
        '20% discount on repairs'
      ],
      isFeatured: false
    },
    {
      title: 'Premium',
      price: '49.99',
      features: [
        'Quarterly AC maintenance',
        'Filter replacements',
        'Comprehensive system check',
        'Priority email & phone support',
        '30% discount on repairs',
        'Emergency service within 24 hours'
      ],
      isFeatured: true
    },
    {
      title: 'Business',
      price: '99.99',
      features: [
        'Monthly AC maintenance',
        'All filter and part replacements',
        'Advanced system diagnostics',
        'Dedicated support line',
        '40% discount on repairs',
        'Emergency service within 8 hours',
        'Multiple unit coverage'
      ],
      isFeatured: false
    }
  ];

  return (
    <>
      <HeroSection 
        title="Subscription Plans" 
        subtitle="Choose the plan that fits your air conditioning maintenance needs"
        buttonText="Get Started"
        buttonLink="/register"
      />
      
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold">Our Subscription Plans</h2>
              <p className="text-muted">Affordable plans for every need</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {pricingPlans.map((plan, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <PricingCard {...plan} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PricingPage; 