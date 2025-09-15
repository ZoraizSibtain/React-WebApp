import PropTypes from 'prop-types';
import { useState } from 'react';
import './Cart.css';

function Cart({ cart, updateQuantity, removeFromCart, user }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    if (zipCode.length !== 5) return 0;
    const taxPercentage = parseInt(zipCode.substring(0, 1) || '0', 10) + 1;
    const taxRate = taxPercentage / 100;
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const isFormValid = zipCode.length === 5 && name.trim() && email.trim();

  const setFormattedPhone = (newNumber) => {
    const digits = newNumber.replace(/\D/g, '');
    let formatted = digits.substring(0, 3);
    if (digits.length === 3 && newNumber[3] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 3) {
      formatted = `${formatted}-${digits.substring(3, 6)}`;
    }
    if (digits.length === 6 && newNumber[7] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 6) {
      formatted = `${formatted}-${digits.substring(6, 10)}`;
    }
    setPhone(formatted);
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    setIsCheckingOut(true);
    
    try {
      // Create order object
      const order = {
        orderId: `ORD-${Date.now()}`,
        customer: {
          name,
          phone,
          email,
          zipCode,
          userId: user ? user.id : 'guest'
        },
        items: cart.map(item => ({
          itemId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        timestamp: new Date().toISOString()
      };

      // Send order to server/log
      console.log('Submitting order:', order);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Order completed successfully:', order);
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="cart-container">
        <h2>Order Complete!</h2>
        <div className="order-success">
          <p>Thank you for your order!</p>
          <p>A confirmation email has been sent to {email}.</p>
          <button onClick={() => window.location.href = '/'}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</h2>
      
      <div className="cart-content">
        {/* Left column - Cart items */}
        <div className="cart-items-column">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right column - Summary and checkout */}
        <div className="cart-summary-checkout-column">
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            
            {zipCode.length === 5 ? (
              <>
                <div className="summary-row">
                  <span>Tax ({parseInt(zipCode.substring(0, 1)) + 1}%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="warning">Enter ZIP Code to calculate tax and total</div>
            )}
          </div>
          
          <div className="checkout-container">
            <div className="checkout-form-container">
              <h2>Checkout</h2>
              <form onSubmit={submitOrder} className="checkout-form">
                <div className="checkout-form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    disabled={isCheckingOut}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    disabled={isCheckingOut}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setFormattedPhone(event.target.value)}
                    placeholder="123-456-7890"
                    disabled={isCheckingOut}
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="zipcode">ZIP Code</label>
                  <input
                    id="zipcode"
                    type="text"
                    maxLength="5"
                    inputMode="numeric"
                    value={zipCode}
                    onChange={(event) => setZipCode(event.target.value.replace(/\D/g, '').slice(0, 5))}
                    required
                    disabled={isCheckingOut}
                    placeholder="Enter your ZIP code"
                  />
                </div>

                <button 
                  type="submit" 
                  className="checkout-button"
                  disabled={!isFormValid || isCheckingOut}
                >
                  {isCheckingOut ? 'Processing Order...' : 'Complete Order'}
                </button>

                {user && (
                  <div className="user-note">
                    <p>Thank you for shopping with us, {user.name}!</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Cart;