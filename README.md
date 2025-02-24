# MEAN Stack Sample Application

A sample application built using the MEAN stack (MongoDB, Express.js, Angular, and Node.js).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- CRUD operations for managing data
- Responsive front-end design with Angular
- RESTful API built with Express.js and Node.js
- MongoDB integration for data storage

## Technologies Used

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Angular CLI](https://angular.io/cli) installed globally
- [MongoDB](https://www.mongodb.com/) instance running

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eccsm/MEAN-Stack-Sample-App.git
   cd MEAN-Stack-Sample-App
   ```

2. **Install server dependencies:**
   ```bash
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd src
   npm install
   ```

### Configuration

1. **Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/mean_sample_app
     JWT_SECRET=your_jwt_secret
     ```

### Running the Application

1. **Start the server:**
   - In the root directory, run:
     ```bash
     npm start
     ```
   - The server will start on the port specified in your configuration (default is `http://localhost:3000/`).

2. **Start the client:**
   - In the `src` directory, run:
     ```bash
     ng serve
     ```
   - The Angular application will start on `http://localhost:4200/` by default.

## Folder Structure

```
MEAN-Stack-Sample-App/
├── src/
│   ├── app/
│   ├── assets/
│   ├── environments/
│   ├── angular.json
│   ├── package.json
│   ├── README.md
├── server/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── app.js
│   ├── package.json
│   ├── README.md
└── .env
```

- `src/`: Contains the Angular front-end application.
  - `app/`: Source code for the Angular app.
  - `angular.json`: Angular CLI configuration file.
  - `package.json`: Lists client-side dependencies and scripts.
- `server/`: Contains the Express.js back-end application.
  - `routes/`: Defines API routes.
  - `models/`: Data models for handling application data.
  - `controllers/`: Business logic for handling requests.
  - `app.js`: Entry point for the server application.
  - `package.json`: Lists server-side dependencies and scripts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements, bug fixes, or suggestions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

