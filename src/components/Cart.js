import './Cart.css';
import PropTypes from 'prop-types';

function Cart({ cart, updateQuantity, removeFromCart }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

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
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            {/* <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div> */}
            
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">${item.price.toFixed(2)}</p>
            </div>
            
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
      
      <div className="cart-summary">
        <div className="total-amount">
          Total: ${calculateTotal().toFixed(2)}
        </div>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;