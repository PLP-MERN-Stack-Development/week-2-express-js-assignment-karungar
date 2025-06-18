// middleware.js - Custom middleware functions

// Custom Error Classes
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = 401;
  }
}

// Logger Middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// Authentication Middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    throw new AuthError('API key is missing');
  }
  
  if (apiKey !== 'secret-api-key') {
    throw new AuthError('Invalid API key');
  }
  
  next();
};

// Validation Middleware
const validateProduct = (req, res, next) => {
  const product = req.body;
  const requiredFields = ['name', 'description', 'price', 'category'];
  
  if (!product) {
    throw new ValidationError('Product data is required');
  }
  
  for (const field of requiredFields) {
    if (!product[field]) {
      throw new ValidationError(`${field} is required`);
    }
  }
  
  if (typeof product.price !== 'number' || product.price <= 0) {
    throw new ValidationError('Price must be a positive number');
  }
  
  if (typeof product.inStock !== 'boolean') {
    throw new ValidationError('inStock must be a boolean');
  }
  
  next();
};

// Global Error Handler
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`[${new Date().toISOString()}] Error: ${message}`);
  
  res.status(statusCode).json({
    error: {
      name: err.name,
      message,
      status: statusCode
    }
  });
};

module.exports = {
  NotFoundError,
  ValidationError,
  AuthError,
  logger,
  authenticate,
  validateProduct,
  errorHandler
};