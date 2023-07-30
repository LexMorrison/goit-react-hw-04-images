import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <ImageGalleryItemLi>
        <ImageGalleryItemImg
          src={this.props.depiction.webformatURL}
          alt="depiction"
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            onClick={this.toggleModal}
            largeImg={this.props.depiction.largeImageURL}
          />
        )}
      </ImageGalleryItemLi>
    );
  }
}

ImageGalleryItem.propTypes = {
  depiction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
