import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Tabs, Tab, Alert, Form } from 'react-bootstrap';
import { FaCalendarAlt, FaWrench, FaCreditCard, FaHome, FaBell, FaUserCog } from 'react-icons/fa';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Premium',
    nextBillingDate: '2023-12-15',
    memberSince: '2022-05-10'
  };

  const properties = [
    {
      id: 1,
      name: 'Home',
      address: '123 Main Street, Airville, AC 12345',
      acUnits: 2,
      lastService: '2023-10-05'
    },
    {
      id: 2,
      name: 'Office',
      address: '456 Business Ave, Cooltown, AC 67890',
      acUnits: 1,
      lastService: '2023-11-12'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: '2023-12-20',
      time: '10:00 AM - 12:00 PM',
      serviceType: 'Regular Maintenance',
      property: 'Home',
      status: 'scheduled'
    }
  ];

  const serviceHistory = [
    {
      id: 1,
      date: '2023-11-12',
      serviceType: 'Emergency Repair',
      property: 'Office',
      technician: 'Mike Johnson',
      notes: 'Replaced capacitor and cleaned coils'
    },
    {
      id: 2,
      date: '2023-10-05',
      serviceType: 'Regular Maintenance',
      property: 'Home',
      technician: 'Sarah Smith',
      notes: 'System functioning properly. Filter replaced.'
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: '2023-11-15',
      amount: 49.99,
      description: 'Premium Plan - Monthly Subscription',
      status: 'paid'
    },
    {
      id: 2,
      date: '2023-10-15',
      amount: 49.99,
      description: 'Premium Plan - Monthly Subscription',
      status: 'paid'
    }
  ];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Dashboard</h1>
          <p className="text-muted">
            Welcome back, {user.name}! Manage your subscription, properties, and service appointments.
          </p>
        </Col>
      </Row>

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
                  <p className="mb-2">
                    <span className="text-muted">Current Plan:</span>{' '}
                    <Badge bg="primary" className="ms-2">{user.plan}</Badge>
                  </p>
                  <p className="mb-2">
                    <span className="text-muted">Next Billing Date:</span>{' '}
                    <span className="fw-semibold">{user.nextBillingDate}</span>
                  </p>
                  <div className="mt-3">
                    <Button variant="outline-primary" size="sm">
                      Change Plan
                    </Button>
                  </div>
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
                    <Button variant="outline-primary" size="sm">
                      Manage Properties
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Upcoming Service</h5>
                  {upcomingAppointments.length > 0 ? (
                    <>
                      <p className="mb-2">
                        <span className="text-muted">Next Appointment:</span>{' '}
                        <span className="fw-semibold">{upcomingAppointments[0].date}</span>
                      </p>
                      <p className="mb-2">
                        <span className="text-muted">Time:</span>{' '}
                        <span className="fw-semibold">{upcomingAppointments[0].time}</span>
                      </p>
                      <div className="mt-3">
                        <Button variant="outline-primary" size="sm">
                          View Details
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p>No upcoming appointments.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Alert variant="info">
                <div className="d-flex align-items-center">
                  <FaBell className="me-3 text-primary" size={20} />
                  <div>
                    <strong>Reminder:</strong> Your next regular maintenance is scheduled for December 20, 2023. Make sure someone is available at the property.
                  </div>
                </div>
              </Alert>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <h5 className="mb-0 fw-bold">Recent Service History</h5>
                </Card.Header>
                <Card.Body>
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
                      {serviceHistory.slice(0, 2).map((service) => (
                        <tr key={service.id}>
                          <td>{service.date}</td>
                          <td>{service.serviceType}</td>
                          <td>{service.property}</td>
                          <td>{service.technician}</td>
                          <td>{service.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="text-center mt-2">
                    <Button variant="link" onClick={() => setActiveTab('serviceHistory')}>
                      View All Service History
                    </Button>
                  </div>
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
                <Button variant="primary" size="sm">
                  <FaCalendarAlt className="me-2" /> Schedule Service
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {upcomingAppointments.length > 0 ? (
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
                    {upcomingAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.serviceType}</td>
                        <td>{appointment.property}</td>
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
                <Button variant="primary" size="sm">
                  <FaHome className="me-2" /> Add Property
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                {properties.map((property) => (
                  <Col md={6} className="mb-4" key={property.id}>
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <h5 className="fw-bold">{property.name}</h5>
                        <p className="text-muted mb-3">{property.address}</p>
                        <div className="d-flex justify-content-between mb-2">
                          <span>AC Units:</span>
                          <span className="fw-semibold">{property.acUnits}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span>Last Serviced:</span>
                          <span className="fw-semibold">{property.lastService}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <Button variant="outline-primary" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            Remove
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="billing" title="Billing">
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Billing History</h5>
                <Button variant="primary" size="sm">
                  <FaCreditCard className="me-2" /> Update Payment Method
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((bill) => (
                    <tr key={bill.id}>
                      <td>{bill.date}</td>
                      <td>{bill.description}</td>
                      <td>${bill.amount.toFixed(2)}</td>
                      <td>
                        <Badge bg={bill.status === 'paid' ? 'success' : 'warning'}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm">
                          View Invoice
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="serviceHistory" title="Service History">
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0 fw-bold">Service History</h5>
            </Card.Header>
            <Card.Body>
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
                  {serviceHistory.map((service) => (
                    <tr key={service.id}>
                      <td>{service.date}</td>
                      <td>{service.serviceType}</td>
                      <td>{service.property}</td>
                      <td>{service.technician}</td>
                      <td>{service.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="account" title="Account Settings">
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Account Settings</h5>
                <Button variant="primary" size="sm">
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
                    <span className="fw-semibold">{user.name}</span>
                  </p>
                  <p className="mb-2">
                    <span className="text-muted">Email:</span>{' '}
                    <span className="fw-semibold">{user.email}</span>
                  </p>
                  <p className="mb-2">
                    <span className="text-muted">Member Since:</span>{' '}
                    <span className="fw-semibold">{user.memberSince}</span>
                  </p>
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

export default DashboardPage; 