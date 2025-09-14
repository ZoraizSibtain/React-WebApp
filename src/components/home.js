import PropTypes from 'prop-types';
import Post from './Category';

function Home({ ottersArray, setSelectedPostName }) {
  const getPostColor = (index) => {
    return (index + 1) % 2 === 0 ? '#2575fc' : '#6a11cb';
  };

  return (
    <ul className="post-list">
      {ottersArray.map((post, index) => (
        <Post
          key={post.id}
          image={post.image}
          name={post.name}
          setSelectedPostName={setSelectedPostName}
          backgroundColor={getPostColor(index)}
        />
      ))}
    </ul>
  );
}

Home.propTypes = {
  ottersArray: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSelectedPostName: PropTypes.func.isRequired,
};

export default Home;