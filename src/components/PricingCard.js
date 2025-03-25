import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';

const PricingCard = ({ title, price, features, isFeatured, planId }) => {
  const { isAuthenticated } = useAuth();
  const { subscribe } = useDashboard();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const result = await subscribe({
        planId: planId || (title === 'Basic' ? 1 : title === 'Premium' ? 2 : 3),
        amount: parseFloat(price)
      });

      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <Card className={`pricing-card h-100 ${isFeatured ? 'featured' : ''}`}>
      {isFeatured && (
        <div className="text-center position-absolute w-100">
          <Badge bg="primary" className="px-3 py-2 rounded-pill text-white">
            Most Popular
          </Badge>
        </div>
      )}
      <Card.Header className={`text-center py-4 ${isFeatured ? 'bg-primary text-white' : ''}`}>
        <h4 className="mb-0">{title}</h4>
      </Card.Header>
      <Card.Body className="text-center">
        <h2 className="mb-4">
          RM {price}
          <small className="text-muted fw-light">/month</small>
        </h2>
        <ul className="list-unstyled">
          {features.map((feature, index) => (
            <li key={index} className="mb-3">
              {feature}
            </li>
          ))}
        </ul>
      </Card.Body>
      <Card.Footer className="text-center bg-transparent border-0 pb-4">
        <Button 
          onClick={handleSubscribe}
          variant={isFeatured ? "primary" : "outline-primary"} 
          size="lg" 
          className="w-75"
        >
          Subscribe Now
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PricingCard; 