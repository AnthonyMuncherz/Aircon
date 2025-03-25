-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS aircon_db;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS 'aircon_user'@'%' IDENTIFIED BY 'aircon_password';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON aircon_db.* TO 'aircon_user'@'%';

-- Apply privileges
FLUSH PRIVILEGES;

-- Switch to the created database
USE aircon_db;

-- Initial subscription plans reference table
CREATE TABLE IF NOT EXISTS `plans` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `description` TEXT NULL,
  `features` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- Insert basic plans if not exists
INSERT INTO `plans` (`id`, `title`, `price`, `description`, `features`)
SELECT 1, 'Basic', 99.00, 'Essential air conditioning maintenance for residential properties', 
       'Bi-annual AC maintenance;Filter replacements;Basic system health check;Email support;20% discount on repairs'
WHERE NOT EXISTS (SELECT 1 FROM `plans` WHERE `id` = 1);

INSERT INTO `plans` (`id`, `title`, `price`, `description`, `features`)
SELECT 2, 'Premium', 179.00, 'Enhanced maintenance with priority service', 
       'Quarterly AC maintenance;Filter replacements;Comprehensive system check;Priority email & phone support;30% discount on repairs;Emergency service within 24 hours'
WHERE NOT EXISTS (SELECT 2 FROM `plans` WHERE `id` = 2);

INSERT INTO `plans` (`id`, `title`, `price`, `description`, `features`)
SELECT 3, 'Business', 349.00, 'Complete coverage for commercial properties with multiple units', 
       'Monthly AC maintenance;All filter and part replacements;Advanced system diagnostics;Dedicated support line;40% discount on repairs;Emergency service within 8 hours;Multiple unit coverage'
WHERE NOT EXISTS (SELECT 3 FROM `plans` WHERE `id` = 3); 