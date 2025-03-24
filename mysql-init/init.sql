-- Create tables for the CoolAir application

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Subscription plans table
CREATE TABLE subscription_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_months INT NOT NULL,
    features TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User subscriptions table
CREATE TABLE user_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    payment_status ENUM('paid', 'pending', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

-- Properties table (for users with multiple properties)
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    property_type ENUM('residential', 'commercial') DEFAULT 'residential',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- AC Units table
CREATE TABLE ac_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    brand VARCHAR(50),
    model VARCHAR(50),
    serial_number VARCHAR(50),
    installation_date DATE,
    last_service_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Service appointments table
CREATE TABLE service_appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time_slot VARCHAR(20) NOT NULL,
    service_type ENUM('maintenance', 'repair', 'installation') DEFAULT 'maintenance',
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    technician_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Seed data for subscription plans
INSERT INTO subscription_plans (name, description, price, duration_months, features) VALUES
('Basic', 'Basic air conditioning maintenance plan', 29.99, 1, 'Bi-annual AC maintenance, Filter replacements, Basic system health check, Email support, 20% discount on repairs'),
('Premium', 'Premium air conditioning maintenance plan', 49.99, 1, 'Quarterly AC maintenance, Filter replacements, Comprehensive system check, Priority email & phone support, 30% discount on repairs, Emergency service within 24 hours'),
('Business', 'Business air conditioning maintenance plan', 99.99, 1, 'Monthly AC maintenance, All filter and part replacements, Advanced system diagnostics, Dedicated support line, 40% discount on repairs, Emergency service within 8 hours, Multiple unit coverage');

-- Create sample admin user (password: admin123)
INSERT INTO users (first_name, last_name, email, password, phone) VALUES
('Admin', 'User', 'admin@coolairservices.com', '$2a$10$dP8P1Td1M9pLt.MgKY8Qe.RqbGv2P7uZK7N3jNF1vCKY4Qaw9U1NO', '123-456-7890'); 