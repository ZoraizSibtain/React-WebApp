const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the otters folder
app.use('/images', express.static(path.join(__dirname, '../src/otters')));

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`Accessing ${req.method} ${req.path}`);
  next();
});

// Mock database - categories with products
const categories = [
  { 
    id: 1, 
    name: 'Mobile Devices', 
    image: '/images/phone.jpg',
    description: 'Portable communication devices',
    products: [
      { id: 1001, name: 'iPhone 15 Pro', price: 999.99, specs: '6.1" Super Retina XDR', image: '/images/iphone.jpg' },
      { id: 1002, name: 'Samsung Galaxy S23', price: 899.99, specs: '6.1" Dynamic AMOLED', image: '/images/galaxy.jpg' },
      { id: 1003, name: 'Google Pixel 8', price: 799.99, specs: '6.2" OLED', image: '/images/pixel.jpg' }
    ]
  },
  { 
    id: 2, 
    name: 'Computers', 
    image: '/images/laptop.jpg',
    description: 'Computing devices for work and gaming',
    products: [
      { id: 2001, name: 'MacBook Pro 16"', price: 2499.99, specs: 'M3 Pro, 16GB RAM', image: '/images/macbook.jpg' },
      { id: 2002, name: 'Dell XPS 15', price: 1899.99, specs: 'Intel i7, 16GB RAM', image: '/images/dell.jpg' },
      { id: 2003, name: 'iMac 24"', price: 1499.99, specs: 'M3, 8GB RAM', image: '/images/imac.jpg' }
    ]
  },
  { 
    id: 3, 
    name: 'Smart Home', 
    image: '/images/voiceassistant.jpg',
    description: 'Smart home devices and assistants',
    products: [
      { id: 3001, name: 'Amazon Echo Dot', price: 49.99, specs: '4th Gen', image: '/images/echo.jpg' },
      { id: 3002, name: 'Google Nest Mini', price: 39.99, specs: '2nd Gen', image: '/images/nest.jpg' },
      { id: 3003, name: 'Philips Hue Starter Kit', price: 199.99, specs: '3 bulbs + bridge', image: '/images/hue.jpg' }
    ]
  },
  { 
    id: 4, 
    name: 'Wearables', 
    image: '/images/wearabletech.jpg',
    description: 'Wearable technology devices',
    products: [
      { id: 4001, name: 'Apple Watch Series 9', price: 399.99, specs: '45mm GPS', image: '/images/applewatch.jpg' },
      { id: 4002, name: 'Samsung Galaxy Watch 6', price: 349.99, specs: '44mm', image: '/images/galaxywatch.jpg' },
      { id: 4003, name: 'Fitbit Charge 6', price: 159.99, specs: 'Advanced health tracking', image: '/images/fitbit.jpg' }
    ]
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'SmartPortables API Server',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      category: '/api/categories/:id',
      subcategory: '/api/subcategories/:id',
      product: '/api/products/:id'
    }
  });
});

// Get all categories
app.get('/api/categories', (req, res) => {
  try {
    // Return only main category info without subcategories for listing
    const categoryList = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      image: cat.image,
      description: cat.description
    }));
    
    res.json({
      success: true,
      data: categoryList,
      count: categoryList.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// Get single category with subcategories
app.get('/api/categories/:id', (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(c => c.id === categoryId);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message
    });
  }
});

// Get single subcategory with products
app.get('/api/subcategories/:id', (req, res) => {
  try {
    const subcategoryId = parseInt(req.params.id);
    
    // Find the subcategory by searching through all categories
    let subcategory = null;
    for (const category of categories) {
      subcategory = category.subcategories.find(sc => sc.id === subcategoryId);
      if (subcategory) break;
    }
    
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found'
      });
    }
    
    res.json({
      success: true,
      data: subcategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subcategory',
      error: error.message
    });
  }
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    // Find the product by searching through all categories and subcategories
    let product = null;
    for (const category of categories) {
      for (const subcategory of category.subcategories) {
        product = subcategory.products.find(p => p.id === productId);
        if (product) break;
      }
      if (product) break;
    }
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// Add to cart endpoint (mock)
app.post('/api/cart', (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Find the product
    let product = null;
    for (const category of categories) {
      for (const subcategory of category.subcategories) {
        product = subcategory.products.find(p => p.id === parseInt(productId));
        if (product) break;
      }
      if (product) break;
    }
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product added to cart',
      data: {
        product: product.name,
        quantity,
        price: product.price,
        total: (product.price * quantity).toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Something broke!',
    error: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(port, () => {
  console.log(`SmartPortables server listening on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('- GET /api/categories - List all categories');
  console.log('- GET /api/categories/:id - Get category with subcategories');
  console.log('- GET /api/subcategories/:id - Get subcategory with products');
  console.log('- GET /api/products/:id - Get product details');
});