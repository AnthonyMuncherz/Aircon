import React, { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';

const TestPage = () => {
  const [apiStatus, setApiStatus] = useState({ loading: false, success: null, message: '' });
  const [plans, setPlans] = useState([]);
  
  const testApi = async () => {
    setApiStatus({ loading: true, success: null, message: 'Testing API connection...' });
    
    try {
      const response = await fetch('/api/plans');
      const data = await response.json();
      
      setPlans(data);
      setApiStatus({ 
        loading: false, 
        success: true, 
        message: `API connection successful. Found ${data.length} plans.` 
      });
    } catch (error) {
      console.error('API Test Error:', error);
      setApiStatus({ 
        loading: false, 
        success: false, 
        message: `API connection failed: ${error.message}` 
      });
    }
  };
  
  useEffect(() => {
    // Test API on page load
    testApi();
  }, []);
  
  return (
    <Container className="py-5">
      <h2>API Connection Test</h2>
      
      {apiStatus.message && (
        <Alert variant={apiStatus.success ? 'success' : apiStatus.success === false ? 'danger' : 'info'}>
          {apiStatus.message}
        </Alert>
      )}
      
      <Button 
        variant="primary" 
        onClick={testApi}
        disabled={apiStatus.loading}
      >
        {apiStatus.loading ? 'Testing...' : 'Test API Connection'}
      </Button>
      
      {plans.length > 0 && (
        <div className="mt-4">
          <h3>Available Plans:</h3>
          <ul>
            {plans.map((plan) => (
              <li key={plan.id}>
                {plan.title} - RM {plan.price} ({plan.description})
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default TestPage; 