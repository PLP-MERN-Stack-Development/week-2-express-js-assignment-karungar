const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    index: true
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'Price must be positive']
  },
  category: { 
    type: String, 
    required: true,
    enum: ['electronics', 'clothing', 'kitchen', 'books', 'other']
  },
  inStock: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Text index for search
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);