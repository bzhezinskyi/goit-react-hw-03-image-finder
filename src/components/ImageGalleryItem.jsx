import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  galleryItem: { largeImageURL, webformatURL, tags },
  handleClick,
}) {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        handleClick(largeImageURL, tags);
      }}
    >
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  galleryItem: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
