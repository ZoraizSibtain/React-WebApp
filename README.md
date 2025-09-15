# SmartPortables E-Commerce App
A modern, responsive e-commerce application built with React for selling portable electronic devices.

# Features
- Product Catalog: Browse products organized by categories
- Shopping Cart: Add/remove items, adjust quantities
- User Authentication: Login functionality with session persistence
- Responsive Design: Works on desktop and mobile devices
- Order Checkout: Complete with tax calculation based on ZIP code
- Toast Notifications: User feedback for actions

# Tech Stack
- Frontend: React 18, React Router DOM
- Styling: CSS3 with responsive design
- HTTP Client: Axios for API calls
- Notifications: React Toastify
- State Management: React hooks (useState, useEffect)

# Project Structure
src/
├── components/
│   ├── Cart.js          # Shopping cart and checkout
│   ├── Category.js      # Individual category items
│   ├── Header.js        # Navigation header
│   ├── Login.js         # Authentication form
│   ├── ProductList.js   # Product display grid
│   └── SelectedItem.js  # Selected category view
├── App.js               # Main application component
├── index.js             # Application entry point
└── styles/              # CSS files for each component

# Getting Started

# Prerequisites

- Node.js (v14 or higher)
- npm or yarn

# Installation
1. Clone the repository:
    git clone <repository-url>
    cd smartportables

2. Install dependencies:
    npm install
    npm install react react-dom react-scripts
    npm install react-router-dom
    npm install axios
    npm install prop-types
    npm install react-toastify

3. Start the development server:
    npm run dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser

# API Integration
The app is designed to work with a backend API with the following endpoints:

- `GET /api/categories` - Fetch all categories
- `GET /api/categories/:id` - Fetch specific category with products
- `POST /api/auth/login` - User authentication
- `GET /api/auth/status` - Check authentication status

# Key Functionality

# Shopping Cart
- Add products to cart with quantity management
- Persistent cart state during session
- Tax calculation based on ZIP code (first digit + 1%)
- Order submission simulation

# User Authentication
- Login form with email/password validation
- Session persistence using localStorage
- Protected routes for authenticated users

# Responsive Design
- Mobile-friendly navigation with hamburger menu
- Flexible grid layouts for products and categories
- Adaptive styling for different screen sizes

# Available Scripts
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

# Browser Support
This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest) - tested 09/13/2025
- Safari (latest) - tested 09/12/2025
- Edge (latest)

# Future Enhancements
- User registration functionality
- Product search and filtering
- Order history and tracking
- Payment integration
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for product management

# Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License
This project is licensed under the MIT License - see the LICENSE file for details.