# Secure Inventory Management Portal (MEAN Stack)

A decoupled, full-stack inventory management system built with the MEAN stack (MongoDB, Express.js, Angular, Node.js). This application features a secure RESTful API backend and a dynamic, reactive frontend to manage multi-entity relational data (Customers, Products, Vendors).

## 🚀 Live Demo
**[View Live Application: mean-inventory-portal.vercel.app](https://mean-inventory-portal.vercel.app/)**

## 💻 Tech Stack
*   **Frontend:** Angular, TypeScript, HTML/CSS
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Security:** JSON Web Tokens (JWT), RSA Key-Pair Generation, Angular Route Guards, HTTP Interceptors

## ✨ Key Features
*   **Secure Authentication:** Utilizes asymmetric RSA keys to sign and verify JWTs for secure session management.
*   **Decoupled Architecture:** Strict separation of concerns between the client interface and the API server.
*   **Relational Data Management:** Full CRUD capabilities for complex, interconnected data models using Mongoose schemas.
*   **Protected Routes:** Client-side routing is secured via Angular Guards, redirecting unauthorized traffic.

## 🛠️ Local Installation & Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) installed
*   [Angular CLI](https://angular.io/cli) installed globally (`npm install -g @angular/cli`)
*   Local MongoDB instance or MongoDB Atlas URI

### 1. Backend Setup (JWTServer)
```bash
cd JWTServer
npm install
# Add your MongoDB URI and RSA Keys to your environment variables
node server.js
```
*The server will run on http://localhost:3000 (or your configured port).*

### 2. Frontend Setup (JWTClient)
```bash
cd JWTClient
npm install
ng serve
```
*Navigate to http://localhost:4200 in your browser to view the application.*
