import './Category.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Category({ category, isSelected, onSelect, backgroundColor }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    onSelect(category);
  };

  return (
    <li className={`category-component ${isSelected ? 'selected' : ''}`}>
      <button 
        onClick={handleClick}
        style={{ backgroundColor: backgroundColor }}
      >
        <img 
          src={category.image} 
          alt={category.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        <p className="category-name">{category.name}</p>
      </button>
    </li>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default Category;