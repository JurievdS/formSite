# Parts Documentation System

A full-stack parts management and documentation system built with the MERN stack.

## Features

- **User Authentication** - JWT-based login with bcrypt password hashing
- **Role-Based Access Control** - Users, Groups, and Roles management
- **Parts Management** - Track engineering parts with specifications (measurements, bolt specs, reference images)
- **Document System** - Templates, categories, and document types
- **File Storage** - GridFS for document and image storage

## Tech Stack

**Frontend:** React, Redux, React Router, React Bootstrap, Axios  
**Backend:** Node.js, Express, Passport.js (JWT), MongoDB with Mongoose  
**Storage:** GridFS for file uploads

## Setup
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure environment
cp backend/.env.example backend/.env
# Edit .env with your settings

# Run development servers
cd backend && npm start
cd frontend && npm start
```

## Status

This was a personal project exploring full-stack authentication patterns and document management. Not actively maintained.
