import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create dashboard context
const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  
  const [properties, setProperties] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on mount or when auth state changes
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        await Promise.all([
          fetchProperties(),
          fetchAppointments(),
          fetchSubscription()
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, token]);

  // Fetch user properties
  const fetchProperties = async () => {
    if (!token) return;

    try {
      const response = await fetch(`/api/properties`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProperties(data);
        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch properties');
      }
    } catch (error) {
      console.error('Fetch properties error:', error);
      setError('Failed to load properties');
      return [];
    }
  };

  // Add a new property
  const addProperty = async (propertyData) => {
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      const response = await fetch(`/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });

      const data = await response.json();

      if (response.ok) {
        setProperties(prevProperties => [...prevProperties, data.property]);
        return { success: true, property: data.property };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Add property error:', error);
      return { success: false, message: 'Failed to connect to the server' };
    }
  };

  // Fetch user appointments
  const fetchAppointments = async () => {
    if (!token) return;

    try {
      const response = await fetch(`/api/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Fetch appointments error:', error);
      setError('Failed to load appointments');
      return [];
    }
  };

  // Schedule a new appointment
  const scheduleAppointment = async (appointmentData) => {
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      const response = await fetch(`/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (response.ok) {
        setAppointments(prevAppointments => [...prevAppointments, data.appointment]);
        return { success: true, appointment: data.appointment };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Schedule appointment error:', error);
      return { success: false, message: 'Failed to connect to the server' };
    }
  };

  // Fetch user subscription
  const fetchSubscription = async () => {
    if (!token) return;

    try {
      console.log('Fetching subscription data...');
      const response = await fetch(`/api/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Subscription data:', data);
        
        // The backend returns an array of subscriptions, but the frontend expects a single object
        // Get the active subscription if available
        if (data && data.length > 0) {
          // Use the first subscription or find an active one
          const activeSubscription = data.find(sub => sub.status === 'active') || data[0];
          setSubscription(activeSubscription);
          return activeSubscription;
        } else {
          // No subscriptions found
          setSubscription(null);
          return null;
        }
      } else {
        console.error('Failed to fetch subscription, status:', response.status);
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch subscription');
      }
    } catch (error) {
      console.error('Fetch subscription error:', error);
      setError('Failed to load subscription');
      return null;
    }
  };

  // Subscribe to a plan
  const subscribe = async (planId) => {
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      const response = await fetch(`/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ planId })
      });

      const data = await response.json();

      if (response.ok) {
        setSubscription(data.subscription);
        return { success: true, subscription: data.subscription };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      return { success: false, message: 'Failed to connect to the server' };
    }
  };

  // Fetch subscription plans
  const fetchPlans = async () => {
    try {
      const response = await fetch(`/api/plans`);

      if (response.ok) {
        const data = await response.json();
        return { success: true, plans: data };
      } else {
        const error = await response.json();
        return { success: false, message: error.message };
      }
    } catch (error) {
      console.error('Fetch plans error:', error);
      return { success: false, message: 'Failed to fetch subscription plans' };
    }
  };

  // Context value
  const value = {
    properties,
    appointments,
    subscription,
    loading,
    error,
    fetchProperties,
    addProperty,
    fetchAppointments,
    scheduleAppointment,
    fetchSubscription,
    subscribe,
    fetchPlans
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

// Custom hook to use dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default DashboardContext; 