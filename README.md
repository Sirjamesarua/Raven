# RavenBank

RavenBank is a simple money transfer application that facilitates account creation, money transfers, and transaction management. It is built using **Node.js**, **Express.js**, **Knex.js**, and integrates **Swagger** for API documentation.

## Features

- User authentication (signup and login).
- Secure account creation and management.
- Money transfer functionality.
- Webhooks for transaction status updates.
- API documentation using Swagger.
- Database integration with MySQL using Knex.js.
- Environment configuration using `.env`.

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MySQL](https://www.mysql.com/)

---

## Installation

### Clone the Repository
```bash
$ git clone https://github.com/sirjamesarua/raven.git
$ cd raven
```

### Install Dependencies
```bash
$ npm install
```

### Configure Environment Variables
Create a `.env` file in the root directory and define the following variables:
```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=raven
JWT_SECRET='TMa/XOzCyvR0a705m2vGDetUM/41BS48+82J1+CTlSwPLaDPiTiLzJcqoRhcbFhp
oIEqYCXCaH3OQMDV9QMqfQ=='
RAVEN_API_KEY=
RAVEN_API_URL=https://integrations.getravenbank.com/v1
BASE_URL = http://localhost:3000
```

---

## Database Setup

### Migrations
Use Knex.js to create the necessary database tables.

```bash
$ npx knex migrate:latest
```

### Seeds (optional)
If you have seed data, you can run:
```bash
$ npx knex seed:run
```

---

## Running the Application

### Development Mode
```bash
$ npm run dev
```

### Production Mode
```bash
$ npm start
```

The server will start on `http://localhost:3000`.

---

## API Documentation

### Swagger Integration
The API documentation is accessible at:

```
http://localhost:3000/api-docs
```

To ensure the Swagger JSON is available, make a `GET` request to:

```
http://localhost:3000/swagger.json
```

---

## Routes

### Auth Routes
| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| POST   | `/auth/signup`  | Register a new user      |
| POST   | `/auth/login`   | Log in a user            |

### Account Routes
| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | `/account/create`      | Create a new account     |
| GET    | `/account/:user_id`    | Fetch user accounts      |

### Transaction Routes
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/transaction/send` | Send money              |

### Webhook Routes
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/webhook/status`| Update transaction status|

---

## Testing

### Running Tests
RavenBank uses **Jest** and **Supertest** for testing. To run tests:
```bash
$ npm test
```

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework.
- **Knex.js**: SQL query builder.
- **MySQL**: Relational database.
- **Swagger**: API documentation.
- **Jest**: Testing framework.

---

## Project Structure
```
RavenBank/
├── src/
│   ├── controllers/       # Business logic
│   ├── middlewares/       # Middleware logic
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── swagger.js         # Swagger setup
│   ├── app.js             # Express app configuration
│   ├── server.js          # Application entry point
├── migrations/            # Knex migrations
├── seeds/                 # Knex seed data
├── knexfile.js            # Knex configuration
├── package.json           # NPM scripts and dependencies
├── .env                   # Environment variables
└── README.md              # Project documentation
```

---

