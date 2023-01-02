import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ GalleryList, handleClick }) {
  return (
    <ul className="ImageGallery">
      {GalleryList.map(galleryItem => {
        return (
          <ImageGalleryItem
            key={galleryItem.id}
            galleryItem={galleryItem}
            handleClick={handleClick}
          />
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  GalleryList: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};
