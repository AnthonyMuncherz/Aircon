import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import HeroSection from '../components/HeroSection';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';

const PricingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { subscribe, subscription, fetchPlans } = useDashboard();
  
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [plans, setPlans] = useState([]);
  
  useEffect(() => {
    // Check if redirected because subscription is required
    if (location.state?.subscriptionRequired) {
      setShowSubscriptionAlert(true);
    }
    
    // Fetch available plans
    const loadPlans = async () => {
      const result = await fetchPlans();
      if (result.success) {
        setPlans(result.plans);
      }
    };
    
    loadPlans();
  }, [location.state, fetchPlans]);
  
  const pricingPlans = [
    {
      id: 1,
      title: 'Basic',
      price: '99',
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
      id: 2,
      title: 'Premium',
      price: '179',
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
      id: 3,
      title: 'Business',
      price: '349',
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
  
  const handleSelectPlan = (plan) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/pricing', selectedPlan: plan.id } });
      return;
    }
    
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };
  
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate card information based on payment method
      if (paymentMethod === 'credit_card') {
        if (!cardInfo.cardNumber || !cardInfo.cardHolder || !cardInfo.expiryDate || !cardInfo.cvv) {
          setError('Please fill in all credit card information');
          setLoading(false);
          return;
        }
      }
      
      // Simulate payment processing (in a real app, this would call a payment gateway)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful payment, create subscription
      const result = await subscribe(selectedPlan.id);
      
      if (result.success) {
        setSuccess(`You've successfully subscribed to the ${selectedPlan.title} plan!`);
        setTimeout(() => {
          setShowPaymentModal(false);
          navigate('/dashboard');
        }, 3000);
      } else {
        setError(result.message || 'Failed to create subscription');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Render payment form based on selected method
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return (
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              value={cardInfo.cardNumber}
              onChange={handleCardInfoChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
            
            <Form.Label className="mt-3">Card Holder</Form.Label>
            <Form.Control
              type="text"
              name="cardHolder"
              value={cardInfo.cardHolder}
              onChange={handleCardInfoChange}
              placeholder="John Doe"
              required
            />
            
            <Row className="mt-3">
              <Col md={6}>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  name="expiryDate"
                  value={cardInfo.expiryDate}
                  onChange={handleCardInfoChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </Col>
              <Col md={6}>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={cardInfo.cvv}
                  onChange={handleCardInfoChange}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </Col>
            </Row>
          </Form.Group>
        );
      case 'fpx':
        return (
          <Form.Group className="mb-3">
            <Form.Label>Select Bank</Form.Label>
            <Form.Select>
              <option value="">Select your bank</option>
              <option value="maybank">Maybank</option>
              <option value="cimb">CIMB Bank</option>
              <option value="public">Public Bank</option>
              <option value="rhb">RHB Bank</option>
              <option value="hongleong">Hong Leong Bank</option>
              <option value="ambank">AmBank</option>
              <option value="bankislam">Bank Islam</option>
              <option value="bsn">Bank Simpanan Nasional</option>
            </Form.Select>
            <small className="text-muted d-block mt-2">
              You will be redirected to your bank's website to complete the payment.
            </small>
          </Form.Group>
        );
      case 'ewallet':
        return (
          <Form.Group className="mb-3">
            <Form.Label>Select E-Wallet</Form.Label>
            <Form.Select>
              <option value="">Select your e-wallet</option>
              <option value="touchngo">Touch 'n Go eWallet</option>
              <option value="boost">Boost</option>
              <option value="grabpay">GrabPay</option>
              <option value="shopeepay">ShopeePay</option>
              <option value="maybank2u">MAE</option>
            </Form.Select>
            <small className="text-muted d-block mt-2">
              You will be redirected to complete the payment with your selected e-wallet.
            </small>
          </Form.Group>
        );
      default:
        return null;
    }
  };

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
          {showSubscriptionAlert && (
            <Alert variant="warning" className="mb-4" onClose={() => setShowSubscriptionAlert(false)} dismissible>
              <Alert.Heading>Subscription Required</Alert.Heading>
              <p>
                You need an active subscription to access this feature. Please select a subscription plan below to continue.
              </p>
            </Alert>
          )}
          
          {isAuthenticated && subscription && subscription.status === 'active' && (
            <Alert variant="info" className="mb-4">
              <Alert.Heading>You have an active subscription</Alert.Heading>
              <p>
                You are currently subscribed to the {
                  subscription.Plan ? subscription.Plan.title : 
                  subscription.PlanId === 1 ? 'Basic' : 
                  subscription.PlanId === 2 ? 'Premium' : 
                  subscription.PlanId === 3 ? 'Business' : 'Unknown'
                } plan. Your subscription is valid until {new Date(subscription.endDate).toLocaleDateString()}.
              </p>
              <Button variant="outline-primary" onClick={() => navigate('/dashboard/billing')}>
                Manage Your Subscription
              </Button>
            </Alert>
          )}
          
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold">Our Subscription Plans</h2>
              <p className="text-muted">Affordable plans for every need in Malaysia</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {pricingPlans.map((plan, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <PricingCard 
                  {...plan} 
                  buttonText={isAuthenticated ? "Subscribe Now" : "Sign Up & Subscribe"}
                  onSelect={() => handleSelectPlan(plan)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Subscribe to {selectedPlan?.title} Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <div className="mb-4 p-3 border rounded bg-light">
            <h5>Subscription Summary</h5>
            <p className="mb-1"><strong>Plan:</strong> {selectedPlan?.title}</p>
            <p className="mb-1"><strong>Price:</strong> RM {selectedPlan?.price}/month</p>
            <p className="mb-1"><strong>Billing Cycle:</strong> Monthly</p>
            <p className="mb-0"><strong>Total Today:</strong> RM {selectedPlan?.price}</p>
          </div>
          
          <Form onSubmit={handleSubmitPayment}>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <div className="mb-3">
                <Form.Check
                  inline
                  type="radio"
                  label="Credit/Debit Card"
                  name="paymentMethod"
                  id="credit-card"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={handlePaymentMethodChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="FPX Online Banking"
                  name="paymentMethod"
                  id="fpx"
                  value="fpx"
                  checked={paymentMethod === 'fpx'}
                  onChange={handlePaymentMethodChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="E-Wallet"
                  name="paymentMethod"
                  id="ewallet"
                  value="ewallet"
                  checked={paymentMethod === 'ewallet'}
                  onChange={handlePaymentMethodChange}
                />
              </div>
            </Form.Group>
            
            {renderPaymentForm()}
            
            <div className="mt-4">
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay RM ${selectedPlan?.price} & Subscribe`
                )}
              </Button>
            </div>
            
            <div className="mt-3 text-center">
              <small className="text-muted">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
                You will be charged RM {selectedPlan?.price} monthly until you cancel.
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PricingPage; 