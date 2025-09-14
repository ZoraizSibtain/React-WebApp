import './ProductList.css';
import PropTypes from 'prop-types';

function ProductList({ category, onAddToCart }) {
  if (!category || !category.products) {
    return (
      <div className="product-list-container">
        <div className="no-products">
          <p>No products available in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h2 className="category-title">{category.name}</h2>
      
      <div className="products-grid">
        {category.products.map(product => (
          <div key={product.id} className="product-card">
            {/* <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div> */}
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  category: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;