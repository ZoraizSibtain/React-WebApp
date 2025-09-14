import './selectedItem.css';
import PropTypes from 'prop-types';

function SelectedItem({ image, name, description }) {
  return (
    <div className="selected-item">
      {/* <h2>Selected Category</h2> */}
      <p>{name}</p>
      {/* {description && <p className="description">{description}</p>} */}
      <img src={image} alt={name} />
    </div>
  );
}

SelectedItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default SelectedItem;