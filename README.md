# CoolAir - AC Maintenance Subscription Service

A React application for an air conditioning maintenance subscription service with MySQL database running in Docker.

## Features

- Modern responsive UI built with React and Bootstrap
- User authentication (login/registration)
- Subscription plan management
- MySQL database for data storage
- Docker containerization for easy deployment

## Tech Stack

- Frontend: React, React Router, React Bootstrap, React Icons
- Backend: Node.js (to be implemented)
- Database: MySQL
- Containerization: Docker

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js and npm (for local development)

### Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Run the application using Docker Compose:

```bash
docker-compose up
```

This will start:
- The React frontend on http://localhost:3000
- The MySQL database on port 3306
- The backend service on http://localhost:8080 (to be implemented)

### Development Environment

To run the application in development mode without Docker:

```bash
npm install
npm start
```

## Project Structure

```
├── public/                  # Static files
├── src/                     # React source code
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components
│   ├── App.js               # Main App component
│   └── index.js             # Entry point
├── mysql-init/              # MySQL initialization scripts
├── backend/                 # Backend service (to be implemented)
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker configuration for frontend
└── README.md                # Project documentation
```

## Database Structure

The MySQL database includes tables for:
- Users
- Subscription plans
- User subscriptions
- Properties
- AC units
- Service appointments

## License

This project is licensed under the MIT License. 