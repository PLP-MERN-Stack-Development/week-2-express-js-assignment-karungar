// routes.js - API route definitions

const express = require('express');
const router = express.Router();
const {
  authenticate,
  validateProduct,
  ValidationError,
  NotFoundError
} = require('./middleware');
const productModel = require('./productModel');

// Root route
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET all products
router.get('/api/products', async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.inStock) {
      filters.inStock = req.query.inStock.toLowerCase() === 'true';
    }
    
    const products = await productModel.getAllProducts(filters);
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedResult = products.slice(startIndex, endIndex);
    
    res.json({
      total: products.length,
      page,
      pages: Math.ceil(products.length / limit),
      limit,
      products: paginatedResult
    });
  } catch (err) {
    next(err);
  }
});

// GET single product by ID
router.get('/api/products/:id', async (req, res, next) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({
        error: {
          name: err.name,
          message: err.message,
          status: 404
        }
      });
    } else {
      throw err;
    }
  }
});

// CREATE new product
router.post('/api/products', async (req, res) => {
  try {
    const newProduct = await productModel.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// UPDATE existing product
router.put('/api/products/:id', async (req, res, next) => {
  try {
    const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({
        error: {
          name: err.name,
          message: err.message,
          status: 404
        }
      });
    } else {
      throw err;
    }
  }
});

// DELETE product
router.delete('/api/products/:id', async (req, res, next) => {
  try {
    await productModel.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({
        error: {
          name: err.name,
          message: err.message,
          status: 404
        }
      });
    } else {
      throw err;
    }
  }
});

module.exports = router;