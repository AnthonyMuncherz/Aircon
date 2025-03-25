import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Tabs, Tab, Alert, Form, Modal, Spinner } from 'react-bootstrap';
import { FaCalendarAlt, FaWrench, FaCreditCard, FaHome, FaBell, FaUserCog, FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';

const DashboardPage = () => {
  const { user, updateProfile } = useAuth();
  const { 
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
    subscribe
  } = useDashboard();

  // State variables for dashboard functionality
  const [activeTab, setActiveTab] = useState('overview');
  const [addPropertyModal, setAddPropertyModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Property form state
  const [propertyForm, setPropertyForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'residential',
    acUnits: 1
  });

  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    propertyId: '',
    date: '',
    timeSlot: '',
    serviceType: 'maintenance'
  });

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || ''
  });

  // Update profile form with user data when it changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || ''
      });
    }
  }, [user]);

  // Handle property form change
  const handlePropertyFormChange = (e) => {
    const { name, value } = e.target;
    setPropertyForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle appointment form change
  const handleAppointmentFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile form change
  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  // Add new property
  const handleAddProperty = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setActionError('');
    setActionSuccess('');

    try {
      const result = await addProperty(propertyForm);
      
      if (result.success) {
        setActionSuccess('Property added successfully!');
        setPropertyForm({
          name: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          propertyType: 'residential',
          acUnits: 1
        });
        setTimeout(() => {
          setAddPropertyModal(false);
          setActionSuccess('');
        }, 2000);
      } else {
        setActionError(result.message || 'Failed to add property');
      }
    } catch (error) {
      setActionError('An error occurred. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Schedule appointment
  const handleScheduleAppointment = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setActionError('');
    setActionSuccess('');

    try {
      const result = await scheduleAppointment(appointmentForm);
      
      if (result.success) {
        setActionSuccess('Appointment scheduled successfully!');
        setAppointmentForm({
          propertyId: '',
          date: '',
          timeSlot: '',
          serviceType: 'maintenance'
        });
        setTimeout(() => {
          setScheduleModal(false);
          setActionSuccess('');
        }, 2000);
      } else {
        setActionError(result.message || 'Failed to schedule appointment');
      }
    } catch (error) {
      setActionError('An error occurred. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setActionError('');
    setActionSuccess('');

    try {
      const result = await updateProfile(profileForm);
      
      if (result.success) {
        setActionSuccess('Profile updated successfully!');
        setTimeout(() => {
          setUpdateProfileModal(false);
          setActionSuccess('');
        }, 2000);
      } else {
        setActionError(result.message || 'Failed to update profile');
      }
    } catch (error) {
      setActionError('An error occurred. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Add Property Modal
  const AddPropertyModal = () => (
    <Modal show={addPropertyModal} onHide={() => setAddPropertyModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionError && <Alert variant="danger">{actionError}</Alert>}
        {actionSuccess && <Alert variant="success">{actionSuccess}</Alert>}

        <Form onSubmit={handleAddProperty}>
          <Form.Group className="mb-3">
            <Form.Label>Property Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={propertyForm.name} 
              onChange={handlePropertyFormChange}
              required
              placeholder="e.g., Home, Office, Rental"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control 
              type="text" 
              name="address" 
              value={propertyForm.address} 
              onChange={handlePropertyFormChange}
              required
              placeholder="Street address"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  type="text" 
                  name="city" 
                  value={propertyForm.city} 
                  onChange={handlePropertyFormChange}
                  required
                  placeholder="City"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>State/Province</Form.Label>
                <Form.Control 
                  type="text" 
                  name="state" 
                  value={propertyForm.state} 
                  onChange={handlePropertyFormChange}
                  required
                  placeholder="State"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                  type="text" 
                  name="zipCode" 
                  value={propertyForm.zipCode} 
                  onChange={handlePropertyFormChange}
                  required
                  placeholder="Postal code"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Number of AC Units</Form.Label>
                <Form.Control 
                  type="number" 
                  name="acUnits" 
                  value={propertyForm.acUnits} 
                  onChange={handlePropertyFormChange}
                  required
                  min="1"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Property Type</Form.Label>
            <Form.Select 
              name="propertyType" 
              value={propertyForm.propertyType} 
              onChange={handlePropertyFormChange}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" disabled={actionLoading}>
              {actionLoading ? <Spinner size="sm" animation="border" /> : 'Add Property'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Schedule Appointment Modal
  const ScheduleAppointmentModal = () => (
    <Modal show={scheduleModal} onHide={() => setScheduleModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Service Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionError && <Alert variant="danger">{actionError}</Alert>}
        {actionSuccess && <Alert variant="success">{actionSuccess}</Alert>}

        <Form onSubmit={handleScheduleAppointment}>
          <Form.Group className="mb-3">
            <Form.Label>Select Property</Form.Label>
            <Form.Select 
              name="propertyId" 
              value={appointmentForm.propertyId} 
              onChange={handleAppointmentFormChange}
              required
            >
              <option value="">Select a property</option>
              {properties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.name} - {property.address}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service Date</Form.Label>
            <Form.Control 
              type="date" 
              name="date" 
              value={appointmentForm.date} 
              onChange={handleAppointmentFormChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time Slot</Form.Label>
            <Form.Select 
              name="timeSlot" 
              value={appointmentForm.timeSlot} 
              onChange={handleAppointmentFormChange}
              required
            >
              <option value="">Select a time slot</option>
              <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
              <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
              <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Service Type</Form.Label>
            <Form.Select 
              name="serviceType" 
              value={appointmentForm.serviceType} 
              onChange={handleAppointmentFormChange}
              required
            >
              <option value="maintenance">Regular Maintenance</option>
              <option value="repair">Repair Service</option>
              <option value="installation">Installation</option>
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" disabled={actionLoading}>
              {actionLoading ? <Spinner size="sm" animation="border" /> : 'Schedule Appointment'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Update Profile Modal
  const UpdateProfileModal = () => (
    <Modal show={updateProfileModal} onHide={() => setUpdateProfileModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actionError && <Alert variant="danger">{actionError}</Alert>}
        {actionSuccess && <Alert variant="success">{actionSuccess}</Alert>}

        <Form onSubmit={handleUpdateProfile}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="firstName" 
                  value={profileForm.firstName} 
                  onChange={handleProfileFormChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="lastName" 
                  value={profileForm.lastName} 
                  onChange={handleProfileFormChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              type="tel" 
              name="phone" 
              value={profileForm.phone} 
              onChange={handleProfileFormChange}
              placeholder="+60 12-345 6789"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control 
              type="text" 
              name="address" 
              value={profileForm.address} 
              onChange={handleProfileFormChange}
              placeholder="Street address"
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  type="text" 
                  name="city" 
                  value={profileForm.city} 
                  onChange={handleProfileFormChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State/Province</Form.Label>
                <Form.Control 
                  type="text" 
                  name="state" 
                  value={profileForm.state} 
                  onChange={handleProfileFormChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                  type="text" 
                  name="zipCode" 
                  value={profileForm.zipCode} 
                  onChange={handleProfileFormChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" disabled={actionLoading}>
              {actionLoading ? <Spinner size="sm" animation="border" /> : 'Update Profile'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Display loading state
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your dashboard...</p>
      </Container>
    );
  }

  // Helper function to format dates in a more readable way
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Render dashboard based on the data available
  const renderDashboard = () => {
    return (
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">Dashboard</h1>
            <p className="text-muted">
              Welcome back, {user ? `${user.firstName} ${user.lastName}` : 'User'}! Manage your subscription, properties, and service appointments.
            </p>
          </Col>
        </Row>

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="overview" title="Overview">
            <Row>
              <Col lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold mb-3">Subscription Status</h5>
                    {subscription ? (
                      <>
                        <p className="mb-2">
                          <span className="text-muted">Current Plan:</span>{' '}
                          <Badge bg="primary" className="ms-2">
                            {subscription.Plan ? subscription.Plan.title : 
                             subscription.PlanId === 1 ? 'Basic' : 
                             subscription.PlanId === 2 ? 'Premium' : 
                             subscription.PlanId === 3 ? 'Business' : 'Unknown'}
                          </Badge>
                        </p>
                        <p className="mb-2">
                          <span className="text-muted">Amount:</span>{' '}
                          <span className="fw-semibold">RM {subscription.Plan ? subscription.Plan.price : 'N/A'}</span>
                        </p>
                        <p className="mb-2">
                          <span className="text-muted">Next Billing Date:</span>{' '}
                          <span className="fw-semibold">{formatDate(subscription.endDate)}</span>
                        </p>
                        <div className="mt-3">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => setActiveTab('billing')}
                          >
                            Manage Subscription
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mb-2">You don't have an active subscription.</p>
                        <div className="mt-3">
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => window.location.href = '/pricing'}
                          >
                            View Plans
                          </Button>
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold mb-3">Properties</h5>
                    <p className="mb-2">
                      <span className="text-muted">Total Properties:</span>{' '}
                      <span className="fw-semibold">{properties.length}</span>
                    </p>
                    <p className="mb-2">
                      <span className="text-muted">Total AC Units:</span>{' '}
                      <span className="fw-semibold">
                        {properties.reduce((total, property) => total + property.acUnits, 0)}
                      </span>
                    </p>
                    <div className="mt-3">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setAddPropertyModal(true)}
                      >
                        <FaPlus className="me-1" /> Add Property
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold mb-3">Upcoming Service</h5>
                    {appointments.length > 0 ? (
                      <>
                        <p className="mb-2">
                          <span className="text-muted">Next Appointment:</span>{' '}
                          <span className="fw-semibold">{formatDate(appointments[0].date)}</span>
                        </p>
                        <p className="mb-2">
                          <span className="text-muted">Time:</span>{' '}
                          <span className="fw-semibold">{appointments[0].timeSlot}</span>
                        </p>
                        <div className="mt-3">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => setActiveTab('appointments')}
                          >
                            View Details
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>No upcoming appointments.</p>
                        <div className="mt-3">
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => setScheduleModal(true)}
                          >
                            Schedule Service
                          </Button>
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Reminder alert if there's an upcoming appointment */}
            {appointments.length > 0 && (
              <Row className="mt-2">
                <Col>
                  <Alert variant="info">
                    <div className="d-flex align-items-center">
                      <FaBell className="me-3 text-primary" size={20} />
                      <div>
                        <strong>Reminder:</strong> Your next service is scheduled for {formatDate(appointments[0].date)} at {appointments[0].timeSlot}. Make sure someone is available at the property.
                      </div>
                    </div>
                  </Alert>
                </Col>
              </Row>
            )}

            {/* Recent Service History */}
            <Row className="mt-3">
              <Col>
                <Card className="shadow-sm">
                  <Card.Header className="bg-white">
                    <h5 className="mb-0 fw-bold">Recent Service History</h5>
                  </Card.Header>
                  <Card.Body>
                    {appointments.filter(a => a.status === 'completed').length > 0 ? (
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Service Type</th>
                            <th>Property</th>
                            <th>Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments
                            .filter(a => a.status === 'completed')
                            .slice(0, 3)
                            .map((service) => (
                              <tr key={service.id}>
                                <td>{formatDate(service.date)}</td>
                                <td>{service.serviceType}</td>
                                <td>{
                                  properties.find(p => p.id === service.propertyId)?.name || 'Unknown'
                                }</td>
                                <td>{service.technicianNotes || 'No notes'}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-center py-3">No service history available yet.</p>
                    )}
                    {appointments.filter(a => a.status === 'completed').length > 0 && (
                      <div className="text-center mt-2">
                        <Button variant="link" onClick={() => setActiveTab('serviceHistory')}>
                          View All Service History
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="appointments" title="Appointments">
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Upcoming Appointments</h5>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => setScheduleModal(true)}
                  >
                    <FaCalendarAlt className="me-2" /> Schedule Service
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {appointments.filter(a => a.status === 'scheduled').length > 0 ? (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service Type</th>
                        <th>Property</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments
                        .filter(a => a.status === 'scheduled')
                        .map((appointment) => (
                          <tr key={appointment.id}>
                            <td>{formatDate(appointment.date)}</td>
                            <td>{appointment.timeSlot}</td>
                            <td>{appointment.serviceType}</td>
                            <td>{
                              properties.find(p => p.id === appointment.propertyId)?.name || 'Unknown'
                            }</td>
                            <td>
                              <Badge bg={appointment.status === 'scheduled' ? 'success' : 'warning'}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </td>
                            <td>
                              <Button variant="outline-primary" size="sm" className="me-2">
                                Reschedule
                              </Button>
                              <Button variant="outline-danger" size="sm">
                                Cancel
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center py-3">No upcoming appointments. Schedule a service visit!</p>
                )}
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="properties" title="My Properties">
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">My Properties</h5>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => setAddPropertyModal(true)}
                  >
                    <FaHome className="me-2" /> Add Property
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {properties.length > 0 ? (
                  <Row>
                    {properties.map((property) => (
                      <Col md={6} className="mb-4" key={property.id}>
                        <Card className="h-100 shadow-sm">
                          <Card.Body>
                            <h5 className="fw-bold">{property.name}</h5>
                            <p className="text-muted mb-3">{property.address}</p>
                            <div className="d-flex justify-content-between mb-2">
                              <span>City:</span>
                              <span className="fw-semibold">{property.city}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>AC Units:</span>
                              <span className="fw-semibold">{property.acUnits}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                              <span>Last Serviced:</span>
                              <span className="fw-semibold">
                                {property.lastService ? formatDate(property.lastService) : 'Never'}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => {
                                  setAppointmentForm(prev => ({ ...prev, propertyId: property.id }));
                                  setScheduleModal(true);
                                }}
                              >
                                Schedule Service
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-center py-3">
                    You haven't added any properties yet. Add your first property to get started!
                  </p>
                )}
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="billing" title="Billing">
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Subscription Details</h5>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => window.location.href = '/pricing'}
                  >
                    <FaCreditCard className="me-2" /> Change Plan
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {subscription ? (
                  <Row>
                    <Col md={6}>
                      <h6 className="fw-bold mb-3">Current Plan</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Plan:</span>
                        <span className="fw-semibold">
                          {subscription.Plan ? subscription.Plan.title : 
                           subscription.PlanId === 1 ? 'Basic' : 
                           subscription.PlanId === 2 ? 'Premium' : 
                           subscription.PlanId === 3 ? 'Business' : 'Unknown'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Monthly Amount:</span>
                        <span className="fw-semibold">RM {subscription.Plan ? subscription.Plan.price : 'N/A'}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Start Date:</span>
                        <span className="fw-semibold">{formatDate(subscription.startDate)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Next Billing Date:</span>
                        <span className="fw-semibold">{formatDate(subscription.endDate)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Status:</span>
                        <Badge bg={subscription.status === 'active' ? 'success' : 'warning'}>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </Badge>
                      </div>
                    </Col>
                    <Col md={6}>
                      <h6 className="fw-bold mb-3">Payment Method</h6>
                      <p>
                        You're currently using automatic billing with your credit card.
                      </p>
                      <Button variant="outline-primary" size="sm" className="mt-2">
                        Update Payment Method
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <p className="text-center py-3">
                    You don't have an active subscription. Visit our pricing page to subscribe to a plan.
                  </p>
                )}
              </Card.Body>
            </Card>

            <Card className="shadow-sm mt-4">
              <Card.Header className="bg-white">
                <h5 className="mb-0 fw-bold">Billing History</h5>
              </Card.Header>
              <Card.Body>
                {subscription ? (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{formatDate(subscription.startDate)}</td>
                        <td>
                          {subscription.Plan ? subscription.Plan.title : 
                           subscription.PlanId === 1 ? 'Basic' : 
                           subscription.PlanId === 2 ? 'Premium' : 
                           subscription.PlanId === 3 ? 'Business' : 'Unknown'} Plan - Monthly Subscription
                        </td>
                        <td>RM {subscription.Plan ? subscription.Plan.price : 'N/A'}</td>
                        <td>
                          <Badge bg="success">Paid</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center py-3">No billing history available.</p>
                )}
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="serviceHistory" title="Service History">
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <h5 className="mb-0 fw-bold">Service History</h5>
              </Card.Header>
              <Card.Body>
                {appointments.filter(a => a.status === 'completed').length > 0 ? (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Service Type</th>
                        <th>Property</th>
                        <th>Technician</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments
                        .filter(a => a.status === 'completed')
                        .map((service) => (
                          <tr key={service.id}>
                            <td>{formatDate(service.date)}</td>
                            <td>{service.serviceType}</td>
                            <td>{
                              properties.find(p => p.id === service.propertyId)?.name || 'Unknown'
                            }</td>
                            <td>{service.technician || 'Not assigned'}</td>
                            <td>{service.technicianNotes || 'No notes'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center py-3">No service history available yet.</p>
                )}
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="account" title="Account Settings">
            <Card className="shadow-sm">
              <Card.Header className="bg-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Account Settings</h5>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => setUpdateProfileModal(true)}
                  >
                    <FaUserCog className="me-2" /> Update Profile
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6 className="fw-bold mb-3">Personal Information</h6>
                    <p className="mb-2">
                      <span className="text-muted">Name:</span>{' '}
                      <span className="fw-semibold">
                        {user ? `${user.firstName} ${user.lastName}` : ''}
                      </span>
                    </p>
                    <p className="mb-2">
                      <span className="text-muted">Email:</span>{' '}
                      <span className="fw-semibold">{user?.email}</span>
                    </p>
                    <p className="mb-2">
                      <span className="text-muted">Phone:</span>{' '}
                      <span className="fw-semibold">{user?.phone || 'Not provided'}</span>
                    </p>
                    {user?.address && (
                      <p className="mb-2">
                        <span className="text-muted">Address:</span>{' '}
                        <span className="fw-semibold">
                          {user.address}, {user.city}, {user.state} {user.zipCode}
                        </span>
                      </p>
                    )}
                  </Col>
                  <Col md={6}>
                    <h6 className="fw-bold mb-3">Notification Preferences</h6>
                    <Form.Check 
                      type="switch"
                      id="email-notifications"
                      label="Email Notifications"
                      defaultChecked
                      className="mb-2"
                    />
                    <Form.Check 
                      type="switch"
                      id="sms-notifications"
                      label="SMS Notifications"
                      defaultChecked
                      className="mb-2"
                    />
                    <Form.Check 
                      type="switch"
                      id="appointment-reminders"
                      label="Appointment Reminders"
                      defaultChecked
                      className="mb-2"
                    />
                    <Form.Check 
                      type="switch"
                      id="billing-notifications"
                      label="Billing Notifications"
                      defaultChecked
                    />
                  </Col>
                </Row>
                <hr />
                <Row className="mt-3">
                  <Col>
                    <h6 className="fw-bold mb-3">Change Password</h6>
                    <Form>
                      <Row>
                        <Col md={4}>
                          <Form.Group className="mb-3" controlId="currentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter current password" />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter new password" />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm new password" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button variant="primary" type="submit">
                        Change Password
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
    );
  };

  return (
    <>
      {renderDashboard()}
      <AddPropertyModal />
      <ScheduleAppointmentModal />
      <UpdateProfileModal />
    </>
  );
};

export default DashboardPage; 