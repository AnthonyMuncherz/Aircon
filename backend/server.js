const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const sequelize = new Sequelize('aircon_db', 'aircon_user', 'aircon_password', {
  host: 'db',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define models (placeholder for now)

// Define routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CoolAir API.' });
});

// Subscription plans route
app.get('/api/plans', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Basic',
      price: '29.99',
      features: [
        'Bi-annual AC maintenance',
        'Filter replacements',
        'Basic system health check',
        'Email support',
        '20% discount on repairs'
      ]
    },
    {
      id: 2,
      title: 'Premium',
      price: '49.99',
      features: [
        'Quarterly AC maintenance',
        'Filter replacements',
        'Comprehensive system check',
        'Priority email & phone support',
        '30% discount on repairs',
        'Emergency service within 24 hours'
      ]
    },
    {
      id: 3,
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
      ]
    }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 