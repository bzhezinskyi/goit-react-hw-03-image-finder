import PropTypes from 'prop-types';

export default function Modal({
  onModal: { largeImageURL, tags },
  onCloseModal,
}) {
  return (
    <div className="Overlay" onClick={onCloseModal}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onModal: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
