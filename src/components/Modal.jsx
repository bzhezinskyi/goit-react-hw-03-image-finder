import { Component } from 'react';

import { RemoveScroll } from 'react-remove-scroll';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    onModal: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
    onCloseModal: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  handleClickCloseModal = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };
  render() {
    const {
      onModal: { largeImageURL, tags },
    } = this.props;

    return (
      <RemoveScroll className="Overlay" onClick={this.handleClickCloseModal}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </RemoveScroll>
    );
  }
}
