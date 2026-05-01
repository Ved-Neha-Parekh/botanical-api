# Botanical Garden API

A robust RESTful API built with Node.js and Express for managing a botanical garden's plant inventory and user authentication.

## 🌟 Project Specialities & Features

### 🛡️ Security & Performance
- **Rate Limiting**: Protects against brute-force and DDoS attacks by limiting requests (e.g., max 100 requests per 15 minutes per IP).
- **Password Encryption**: Uses `bcryptjs` to automatically hash user passwords via a Mongoose pre-save hook before storing them in the database.
- **JWT Authentication**: Implements secure user authentication and authorization using JSON Web Tokens.
- **Global Middleware**: Rate limiters and payload parsers are strategically placed to reject malicious traffic early, saving server CPU and memory.

### 🌱 Plant Inventory Management (Soft Delete)
- **Soft Deletion**: Instead of permanently deleting plant records, the API uses a "soft delete" approach (`isDeleted` flag and `deletedAt` timestamp) to preserve historical data.
- **Comprehensive Plant Schema**: Tracks essential plant details like categories (INDOOR, OUTDOOR, etc.), watering frequency, seasonal status, and current health/availability status.

### 🏗️ Architecture & Best Practices
- **MVC Pattern**: Code is cleanly organized into Models, Controllers, and Routes for scalability and maintainability.
- **Environment Management**: Securely manages sensitive data (Database URIs, Ports, JWT Secrets) using `dotenv`.
- **Validation**: Enforces strict data validation at the database level using Mongoose schema constraints (e.g., minimum prices, required fields, enums).

## 🛠️ Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: bcryptjs, jsonwebtoken, express-rate-limit
- **Environment**: dotenv
