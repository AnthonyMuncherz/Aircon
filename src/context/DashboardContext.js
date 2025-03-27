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
      // Validate required fields before sending to API
      const requiredFields = ['address', 'city', 'state', 'zipCode'];
      const missingFields = requiredFields.filter(field => !propertyData[field]);
      
      if (missingFields.length > 0) {
        return { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        };
      }
      
      // Log the property data before sending to API
      console.log('Sending property data to API:', propertyData);

      const response = await fetch(`/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });

      console.log('API response status:', response.status);
      const data = await response.json();
      console.log('API response data:', data);

      if (response.ok) {
        // Handle different response formats consistently
        // Backend returns either { property } or the property directly
        const newProperty = data.property || data;
        
        // Verify we have a valid property object with an id
        if (newProperty && newProperty.id) {
          setProperties(prevProperties => [...prevProperties, newProperty]);
          return { success: true, property: newProperty };
        } else {
          console.error('Invalid property data received:', newProperty);
          return { success: false, message: 'Received invalid property data from server' };
        }
      } else {
        console.error('Property creation failed:', data.message || 'Unknown error');
        return { success: false, message: data.message || 'Failed to create property' };
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
      // Validate required fields
      if (!appointmentData.propertyId) {
        return { success: false, message: 'Please select a property' };
      }
      
      if (!appointmentData.date) {
        return { success: false, message: 'Please select a date' };
      }
      
      if (!appointmentData.timeSlot) {
        return { success: false, message: 'Please select a time slot' };
      }
      
      // Map frontend field names to backend field names
      const mappedData = {
        propertyId: appointmentData.propertyId,
        appointmentDate: appointmentData.date,
        serviceType: appointmentData.serviceType,
        timeSlot: appointmentData.timeSlot
      };
      
      console.log('Sending appointment data to API:', mappedData);

      const response = await fetch(`/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mappedData)
      });

      const data = await response.json();
      console.log('Appointment response:', data);

      if (response.ok) {
        setAppointments(prevAppointments => [...prevAppointments, data.appointment]);
        return { success: true, appointment: data.appointment };
      } else {
        return { success: false, message: data.message || 'Failed to schedule appointment' };
      }
    } catch (error) {
      console.error('Schedule appointment error:', error);
      return { success: false, message: error.message || 'Failed to connect to the server' };
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

  // Reschedule an appointment
  const rescheduleAppointment = async (appointmentId, appointmentData) => {
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      // Validate required fields
      if (!appointmentData.date) {
        return { success: false, message: 'Please select a date' };
      }
      
      if (!appointmentData.timeSlot) {
        return { success: false, message: 'Please select a time slot' };
      }
      
      // Map frontend field names to backend field names
      const mappedData = {
        appointmentDate: appointmentData.date,
        timeSlot: appointmentData.timeSlot
      };
      
      console.log(`Rescheduling appointment ID ${appointmentId} with data:`, mappedData);

      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mappedData)
      });

      const data = await response.json();
      console.log('Reschedule response:', data);

      if (response.ok) {
        // Update the appointments state with the updated appointment
        setAppointments(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment.id === appointmentId ? data.appointment : appointment
          )
        );
        return { success: true, appointment: data.appointment };
      } else {
        return { success: false, message: data.message || 'Failed to reschedule appointment' };
      }
    } catch (error) {
      console.error('Reschedule appointment error:', error);
      return { success: false, message: error.message || 'Failed to connect to the server' };
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      console.log(`Cancelling appointment ID ${appointmentId}`);

      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Cancel response:', data);

      if (response.ok) {
        // Update the appointments state with the updated appointment status
        setAppointments(prevAppointments => 
          prevAppointments.map(appointment => 
            appointment.id === appointmentId ? data.appointment : appointment
          )
        );
        return { success: true, appointment: data.appointment };
      } else {
        return { success: false, message: data.message || 'Failed to cancel appointment' };
      }
    } catch (error) {
      console.error('Cancel appointment error:', error);
      return { success: false, message: error.message || 'Failed to connect to the server' };
    }
  };

  // Cancel a subscription
  const cancelSubscription = async (subscriptionId) => {
    if (!token) return { success: false, message: 'Not authenticated' };

    try {
      console.log(`Cancelling subscription ID ${subscriptionId}`);

      const response = await fetch(`/api/subscriptions/${subscriptionId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Cancel subscription response:', data);

      if (response.ok) {
        // Update the subscription state
        setSubscription(data.subscription);
        return { success: true, subscription: data.subscription };
      } else {
        return { success: false, message: data.message || 'Failed to cancel subscription' };
      }
    } catch (error) {
      console.error('Cancel subscription error:', error);
      return { success: false, message: error.message || 'Failed to connect to the server' };
    }
  };

  // Check if user has active subscription
  const hasActiveSubscription = () => {
    return subscription && subscription.status === 'active';
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
    rescheduleAppointment,
    cancelAppointment,
    fetchSubscription,
    subscribe,
    fetchPlans,
    cancelSubscription,
    hasActiveSubscription
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