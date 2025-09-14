import PropTypes from 'prop-types';
import { useState } from 'react';

function Post({ image, name, setSelectedPostName, backgroundColor }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <li className="post-component">
      <button 
        onClick={() => setSelectedPostName(name)}
        style={{ backgroundColor: backgroundColor }}
      >
        <img 
          src={image} 
          alt={name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        <p className="post-name">{name}</p>
      </button>
    </li>
  );
}

Post.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setSelectedPostName: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default Post;