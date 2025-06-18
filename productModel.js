const Product = require('./models/Product');
const { NotFoundError, ValidationError } = require('./middleware');

module.exports = {
  // Get all products with filtering
  getAllProducts: async (filters = {}) => {
    return Product.find(filters);
  },

  // Get single product by ID
  getProductById: async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new NotFoundError('Product not found');
    return product;
  },

  // Create new product
  createProduct: async (productData) => {
    const product = new Product(productData);
    return product.save();
  },

  // Update existing product
  updateProduct: async (id, productData) => {
    const product = await Product.findByIdAndUpdate(
      id, 
      productData, 
      { new: true, runValidators: true }
    );
    if (!product) throw new NotFoundError('Product not found');
    return product;
  },

  // Delete product
  deleteProduct: async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new NotFoundError('Product not found');
  },

  // Search products
  searchProducts: async (searchTerm) => {
    if (!searchTerm) throw new ValidationError('Search query parameter "q" is required');
    return Product.find({ $text: { $search: searchTerm } });
  },

  // Get product statistics
  getProductStats: async () => {
    const stats = {
      totalProducts: await Product.countDocuments(),
      inStock: await Product.countDocuments({ inStock: true }),
      outOfStock: await Product.countDocuments({ inStock: false }),
      byCategory: {}
    };
    
    const categoryStats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    
    categoryStats.forEach(item => {
      stats.byCategory[item._id] = item.count;
    });
    
    return stats;
  }
};