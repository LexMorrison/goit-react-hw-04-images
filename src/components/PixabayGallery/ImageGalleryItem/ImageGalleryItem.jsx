import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

function ImageGalleryItem({ depiction }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImg
        src={depiction.webformatURL}
        alt="depiction"
        onClick={toggleModal}
      />
      {showModal && (
        <Modal onClick={toggleModal} largeImg={depiction.largeImageURL} />
      )}
    </ImageGalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  depiction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
