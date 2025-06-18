# Product API - Comprehensive Documentation
https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black

A RESTful API for managing products with full CRUD operations, authentication, search, and statistics. Built with Express.js, MongoDB, and documented with Swagger.

## Table of Contents
* Installation

* Environment Setup

* Running the Server

* API Documentation

* API Endpoints

* Authentication

* Example cURL Requests


## 🚀 Installation

### Prerequisites

- Node.js v18+
- MongoDB running locally or accessible via URI
-pnpm (or npm)

### Steps

1. Clone the repository:
   ```sh
   git clone <your-repo-url>/product-api.git
   cd product-api
   ```

2. Install dependencies:
   ```sh
   pnpm install 
   # or 
   npm install
   ```

## Environment Setup:
   - Copy `.env.example` to `.env` and fill in the values as needed.
   - Edit the .env file with your configuration
   - Ensure to use gitignore to protect your secrets

## Running the server 
### Development Mode (live reload with nodemon):
   ```sh
   pnpm run dev
   # or
   npm run dev 
   ```
### Production Mode 
   ```sh
   pnpm start
   # or
   npm start 
   ```  
   The server will run on [http://localhost:3000](http://localhost:3000).

## API Documentation

Interactive API documentation is available via Swagger UI at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

## 📚 API Endpoints 

All endpoints require an `x-api-key` header with a valid API key.

### Root

- **GET /**  
  Returns a welcome message.

  **Response:**
  ```json
  "Hello World!"
  ```

### Products

- **GET /api/products**  
  List all products. Supports filtering, pagination, and in-stock filter.

  **Query Parameters:**
  - `category` (string): Filter by category
  - `inStock` (boolean): Filter by in-stock status
  - `page` (integer): Page number (default: 1)
  - `limit` (integer): Items per page (default: 10)

  **Example Request:**
  ```
  GET /api/products?category=electronics&page=1&limit=2
  ```

  **Example Response:**
  ```json
  {
    "total": 5,
    "page": 1,
    "pages": 3,
    "limit": 2,
    "products": [
      {
        "_id": "662f1c...",
        "name": "Laptop",
        "description": "High-performance laptop",
        "price": 1200,
        "category": "electronics",
        "inStock": true
      },
      ...
    ]
  }
  ```

- **GET /api/products/:id**  
  Get a specific product by ID.

  **Example Request:**
  ```
  GET /api/products/662f1c...
  ```

  **Example Response:**
  ```json
  {
    "_id": "662f1c...",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
  ```

- **POST /api/products**  
  Create a new product.

  **Request Body:**
  ```json
  {
    "name": "Smartphone",
    "description": "Latest model",
    "price": 800,
    "category": "electronics",
    "inStock": true
  }
  ```

  **Example Response:**
  ```json
  {
    "_id": "662f1d...",
    "name": "Smartphone",
    "description": "Latest model",
    "price": 800,
    "category": "electronics",
    "inStock": true
  }
  ```

- **PUT /api/products/:id**  
  Update an existing product.

  **Request Body:**
  ```json
  {
    "name": "Smartphone Pro",
    "description": "Upgraded model",
    "price": 950,
    "category": "electronics",
    "inStock": false
  }
  ```

  **Example Response:**
  ```json
  {
    "_id": "662f1d...",
    "name": "Smartphone Pro",
    "description": "Upgraded model",
    "price": 950,
    "category": "electronics",
    "inStock": false
  }
  ```

- **DELETE /api/products/:id**  
  Delete a product.

  **Example Response:**
  ```
  Status: 204 No Content
  ```

---

## 🛡️ Authentication

All requests must include the following header:

```
x-api-key: <your-api-key>
```

---

## 🧪 Example cURL Requests

**Create a Product**
```sh
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"name":"Tablet","description":"10-inch tablet","price":300,"category":"electronics","inStock":true}'
```

**Get All Products**
```sh
curl -X GET "http://localhost:3000/api/products?category=electronics" \
  -H "x-api-key: your-api-key"
```

**Update a Product**
```sh
curl -X PUT http://localhost:3000/api/products/<id> \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"name":"Tablet Pro","description":"12-inch tablet","price":400,"category":"electronics","inStock":false}'
```

**Delete a Product**
```sh
curl -X DELETE http://localhost:3000/api/products/<id> \
  -H "x-api-key: your-api-key"
```

---

## 📖 More

- Full API documentation: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- See [swagger.yaml](swagger.yaml) for OpenAPI spec.

---