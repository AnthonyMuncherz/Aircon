import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import TestPage from './pages/TestPage';

// Auth Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardProvider, useDashboard } from './context/DashboardContext';

// Auth route guard
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Subscription route guard
const SubscriptionProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { hasActiveSubscription, loading } = useDashboard();
  
  // If loading, show nothing (or you could add a loading spinner)
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Checking subscription status...</p>
      </Container>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated but no active subscription, redirect to pricing page
  if (!hasActiveSubscription()) {
    return <Navigate to="/pricing" state={{ subscriptionRequired: true }} />;
  }
  
  // All checks passed, render the children
  return children;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Auth routes with redirects for authenticated users */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} 
          />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/schedule-service" 
            element={
              <SubscriptionProtectedRoute>
                <DashboardPage defaultTab="appointments" />
              </SubscriptionProtectedRoute>
            } 
          />
          
          {/* Test route */}
          <Route path="/test" element={<TestPage />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <DashboardProvider>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/schedule-service" 
                  element={
                    <SubscriptionProtectedRoute>
                      <DashboardPage defaultTab="appointments" />
                    </SubscriptionProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </DashboardProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 