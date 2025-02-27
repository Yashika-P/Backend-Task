# Event Management Platform - Backend

This is the backend API for the **Event Management Platform**. The platform allows users to create, manage events, sell tickets, and register attendees. It is built with **Node.js**, **Express.js**, and **MongoDB**. This API is designed to work with a React frontend and is deployed on Render.

## Table of Contents

- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Project Setup

The backend uses **Node.js** for the server, **Express.js** for building the API, and **MongoDB** for data storage. It is a RESTful API that handles various functionalities like event creation, ticket selling, and attendee registration.

## Environment Variables

Before running the backend, make sure to configure the following environment variables in your `.env` file:

- `MONGO_URI`: The connection string for your MongoDB database.
- `JWT_SECRET`: Secret key used to sign JSON Web Tokens.
- `PORT`: The port where the backend API will run (default: 5000).
- `NODE_ENV`: Set to `development` or `production`.

Example `.env` file:
