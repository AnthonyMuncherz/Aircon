const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'aircon_db', 
  process.env.DB_USER || 'aircon_user', 
  process.env.DB_PASSWORD || 'aircon_password', 
  {
    host: process.env.DB_HOST || 'db',
    dialect: 'mysql',
    logging: console.log
  }
);

// Models
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users',
  underscored: true
});

const Plan = sequelize.define('Plan', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  features: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'plans',
  timestamps: false
});

const Property = sequelize.define('Property', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'My Property'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'zip_code'
  },
  propertyType: {
    type: DataTypes.ENUM('residential', 'commercial'),
    defaultValue: 'residential',
    field: 'property_type'
  },
  acUnits: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: 'ac_units'
  }
}, {
  tableName: 'properties',
  underscored: true
});

const Subscription = sequelize.define('Subscription', {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'start_date'
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_date'
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'cancelled'),
    defaultValue: 'active'
  }
}, {
  tableName: 'user_subscriptions',
  underscored: true
});

const ServiceAppointment = sequelize.define('ServiceAppointment', {
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'appointment_date'
  },
  serviceType: {
    type: DataTypes.ENUM('maintenance', 'repair', 'installation'),
    defaultValue: 'maintenance',
    field: 'service_type'
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  }
}, {
  tableName: 'service_appointments',
  underscored: true
});

// Associations
User.hasMany(Property, { constraints: false });
Property.belongsTo(User, { constraints: false });

User.hasMany(Subscription, { constraints: false });
Subscription.belongsTo(User, { constraints: false });
Subscription.belongsTo(Plan, { constraints: false });

User.hasMany(ServiceAppointment, { constraints: false });
ServiceAppointment.belongsTo(User, { constraints: false });
Property.hasMany(ServiceAppointment, { constraints: false });
ServiceAppointment.belongsTo(Property, { constraints: false });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CoolCare API' });
});

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get subscription plans
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Error fetching plans', error: error.message });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access token required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Protected routes
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
});

// Properties
app.get('/api/properties', authenticateToken, async (req, res) => {
  try {
    const properties = await Property.findAll({
      where: { UserId: req.user.id }
    });
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
});

app.post('/api/properties', authenticateToken, async (req, res) => {
  try {
    const { name, address, city, state, zipCode, propertyType, acUnits } = req.body;
    
    // Log the received data
    console.log('Received property data:', {
      name,
      address,
      city,
      state,
      zipCode,
      propertyType,
      acUnits,
      userId: req.user.id
    });
    
    // Create with proper null/undefined checks
    const property = await Property.create({
      name: name || 'My Property',
      address: address || '',
      city: city || '',
      state: state || '',
      zipCode: zipCode || '',
      propertyType: propertyType || 'residential',
      acUnits: acUnits || 1,
      UserId: req.user.id
    });
    
    console.log('Created property:', property.toJSON());
    
    // Return in a consistent format
    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property: property
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating property', 
      error: error.message 
    });
  }
});

// Subscriptions
app.get('/api/subscriptions', authenticateToken, async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      where: { UserId: req.user.id },
      include: [Plan]
    });
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
  }
});

app.post('/api/subscriptions', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body;
    
    // Find the plan
    const plan = await Plan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    // Calculate end date (1 year from now)
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    
    const subscription = await Subscription.create({
      startDate: new Date(),
      endDate,
      status: 'active',
      UserId: req.user.id,
      PlanId: planId
    });
    
    res.status(201).json({
      message: 'Subscription created successfully',
      subscription
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Error creating subscription', error: error.message });
  }
});

// Cancel subscription
app.put('/api/subscriptions/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the subscription
    const subscription = await Subscription.findOne({
      where: { 
        id: id,
        UserId: req.user.id,
        status: 'active'
      },
      include: [Plan]
    });
    
    if (!subscription) {
      return res.status(404).json({ 
        success: false,
        message: 'Active subscription not found or does not belong to user' 
      });
    }
    
    // Update the status to cancelled
    subscription.status = 'cancelled';
    await subscription.save();
    
    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error cancelling subscription', 
      error: error.message 
    });
  }
});

// Service Appointments
app.get('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const appointments = await ServiceAppointment.findAll({
      where: { UserId: req.user.id },
      include: [Property]
    });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { propertyId, appointmentDate, serviceType, timeSlot } = req.body;
    
    // Input validation
    if (!propertyId) {
      return res.status(400).json({ message: 'Property ID is required' });
    }
    
    if (!appointmentDate) {
      return res.status(400).json({ message: 'Appointment date is required' });
    }
    
    if (!serviceType) {
      return res.status(400).json({ message: 'Service type is required' });
    }
    
    // Log the received data
    console.log('Creating appointment with data:', {
      propertyId,
      appointmentDate,
      serviceType,
      timeSlot,
      userId: req.user.id
    });
    
    // Verify property belongs to user
    const property = await Property.findOne({
      where: { 
        id: propertyId,
        UserId: req.user.id
      }
    });
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found or does not belong to user' });
    }
    
    // Create the appointment with proper data mapping
    const appointment = await ServiceAppointment.create({
      appointmentDate,
      serviceType,
      timeSlot: timeSlot || '9:00 AM - 11:00 AM', // Default time slot if not provided
      status: 'scheduled',
      UserId: req.user.id,
      PropertyId: propertyId
    });
    
    console.log('Created appointment:', appointment.toJSON());
    
    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      appointment
    });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error scheduling appointment', 
      error: error.message 
    });
  }
});

// Update appointment (for rescheduling)
app.put('/api/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentDate, timeSlot } = req.body;
    
    // Input validation
    if (!appointmentDate) {
      return res.status(400).json({ message: 'Appointment date is required' });
    }
    
    // Find the appointment
    const appointment = await ServiceAppointment.findOne({
      where: { 
        id: id,
        UserId: req.user.id
      }
    });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or does not belong to user' });
    }
    
    if (appointment.status !== 'scheduled') {
      return res.status(400).json({ message: 'Only scheduled appointments can be rescheduled' });
    }
    
    // Update the appointment
    appointment.appointmentDate = appointmentDate;
    if (timeSlot) appointment.timeSlot = timeSlot;
    await appointment.save();
    
    res.json({
      success: true,
      message: 'Appointment rescheduled successfully',
      appointment
    });
  } catch (error) {
    console.error('Error rescheduling appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error rescheduling appointment', 
      error: error.message 
    });
  }
});

// Cancel appointment
app.delete('/api/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the appointment
    const appointment = await ServiceAppointment.findOne({
      where: { 
        id: id,
        UserId: req.user.id
      }
    });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or does not belong to user' });
    }
    
    if (appointment.status !== 'scheduled') {
      return res.status(400).json({ message: 'Only scheduled appointments can be cancelled' });
    }
    
    // Update the status to cancelled
    appointment.status = 'cancelled';
    await appointment.save();
    
    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      appointment
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error cancelling appointment', 
      error: error.message 
    });
  }
});

// Function to reset database and initialize app
const initializeApp = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established.');
    
    // Don't drop tables, just sync the model definitions with existing tables
    console.log('Syncing database models...');
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing app:', error);
    setTimeout(initializeApp, 5000); // Retry after 5 seconds
  }
};

// Initialize app
initializeApp();