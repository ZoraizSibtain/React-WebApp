import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import './App.css';
import Header from './components/Header';
import Category from './components/Category';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/categories');
        setCategories(response.data.data);
        setError(null);
        
        // Select first category by default
        if (response.data.data.length > 0 && !selectedCategory) {
          setSelectedCategory(response.data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories from server.');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch full category details when selected
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(`/api/categories/${selectedCategory.id}`);
          setSelectedCategory(response.data.data);
        } catch (err) {
          console.error('Error fetching category details:', err);
        }
      }
    };

    fetchCategoryDetails();
  }, [selectedCategory?.id]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    toast.success(`Added ${product.name} to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getCategoryColor = (index) => {
    if ((index + 1) % 2 === 0) return '#2575fc';
    return '#6a11cb';
  };

  if (loading) {
    return (
      <div className="app-container">
        <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
        <div className="loading">
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      
      {error && <div className="error-banner">{error}</div>}

      <Routes>
        <Route path="/cart" element={
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        } />
        <Route path="/" element={
          <div className='app-content'>
            {/* Categories List */}
            <div className="categories-section">
              <ul className='category-list'>
                {categories.map((category, index) => (
                  <Category
                    key={category.id}
                    category={category}
                    isSelected={selectedCategory?.id === category.id}
                    onSelect={handleCategorySelect}
                    backgroundColor={getCategoryColor(index)}
                  />
                ))}
              </ul>
            </div>

            {/* Products Section */}
            <div className="products-section">
              {selectedCategory ? (
                <ProductList
                  category={selectedCategory}
                  onAddToCart={handleAddToCart}
                />
              ) : (
                <div className="no-selection">
                  <p>Select a category to view products</p>
                </div>
              )}
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;