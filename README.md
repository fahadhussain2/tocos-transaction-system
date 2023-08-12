# Tocos Trading Platform Documentation

Welcome to the documentation for Tocos Trading Platform! This document provides an overview of the application's features, technology stack, usage instructions, testing procedures, and potential improvements.

### Table of Contents

- [Introduction](#introduction)
- [Technology Stack](#technology-stack)
- [Clarity of Design Choices](#clarity-of-design-choices)
- [Features](#features)
  - [Transactions](#transactions)
  - [Adding Users](#adding-users)
  - [Viewing User Details](#viewing-user-details)
  - [Viewing All Users](#viewing-all-users)
  - [Form Validations](#form-validations)
- [Assumptions](#assumptions)
- [Database Models](#database-models)
- [Usage](#usage)
- [Testing](#testing)
- [Possible Improvements](#possible-improvements)
- [Demo](#demo)

### Introduction

Tocos Trading Platform is a web application designed to facilitate transactions between users. It provides features for adding users, managing transactions, and viewing user details. The application is built using a modern technology stack that includes Ant Design, Vite, React Router, Node.js with TypeScript, Express, Jest, Supertest, and MongoDB.

### Technology Stack

**Frontend:**
- Ant Design
- Vite (Frontend build tool)
- React Router

**Backend:**
- Node.js with TypeScript
- Express (Web framework)
- Jest (Testing framework)
- Supertest (HTTP assertions)
- Mongoose (ODM for MongoDB)

**Database:**
- MongoDB

### Clarity of Design Choices

1. #### Backend Server:
- Chose TypeScript for type safety and better code organization.
- Used Express for its simplicity in creating API endpoints.
- Utilized MongoDB as the database to store user information and balances.
- Created separate route handlers for each API endpoint, keeping the code modular.
- Included validation checks, error handling, and appropriate HTTP status codes in responses.

2. #### Frontend:
- Mentioned React for building the user interface, but not detailed the design due to the complexity.
- Encouraged separation of concerns, component-based architecture, and consuming APIs from the backend.

3. #### Dockerization:
- Provided Dockerfiles for both backend and frontend, ensuring ease of deployment.
- Used Node.js LTS as the base image.
- Mentioned the use of npm for package management.

4. #### Testing:

- Suggested using Jest for testing.
- Demonstrated sample tests for user creation, user details, and transactions.
- Included beforeAll and afterAll hooks to manage MongoDB connections.

### Features

#### Transactions

Users can initiate transactions between themselves. Each transaction includes a sender, receiver, and an amount. Transactions are subject to validation rules.

#### Adding Users

Users can be added to the system with their first name, last name, and an initial balance. The initial balance must be greater than 0.

#### Viewing User Details

Users can view their own balance and transaction history.

#### Viewing All Users

An admin user can view a table listing all users with their details.

#### Form Validations

- When adding a user, all required fields must be filled and the initial balance must be greater than 0.
- When adding a transaction, the amount must be greater than 0, the sender and receiver cannot be the same, and the amount cannot exceed the sender's balance.

### Assumptions

- Users have unique first names and last names.
- The application is not responsible for real financial transactions.
- Users are authenticated and authorized to access appropriate features.

### Database Models

The application uses two main database models:

1. **User**: Represents a user with properties like first name, last name, and balance.
2. **Transaction**: Represents a transaction with sender, receiver, amount, and timestamp.

### Usage

To run the Tocos Trading Platform application using Docker Compose:

1. Clone the repository and navigate to the project directory.
2. Make sure Docker is installed on your system.
3. Open a terminal and run the following command:

   ```bash
   docker-compose up
   ```

4. Access the application by navigating to `http://localhost:3001` in your web browser.

### Testing

Testing is an important aspect of ensuring the reliability of the application. To run tests:

1. Modify the api container in the `docker-compose.yml` file, change the target to `test` and set the `NODE_ENV` to `test`.
2. Open a terminal and run the following command:

   ```bash
   docker-compose up
   ```

3. Run the test suite using the following command:

   ```bash
   docker-compose exec api npx jest
   ```

### Possible Improvements

- Implement user authentication and authorization for secure access.
- Add pagination to the user table for better user experience.
- Implement real-time updates using web sockets.
- Enhance error handling and user feedback.
- Optimize database queries for improved performance.

This concludes the documentation for Tocos Trading Platform.

### Demo
[tocos-demonstration.webm](https://github.com/fahadhussain2/tocos-transaction-system/assets/19908737/39564303-daef-42e9-8b45-c8605e3a103e)

**Thank you for Reading!**
