import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ModalOpen } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClick, largeImg }) {
  useEffect(() => {
    const onEscClick = evt => {
      if (evt.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [onClick]);

  const backDropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClick();
    }
  };

  return createPortal(
    <Backdrop onClick={backDropClick}>
      <ModalOpen>
        <img src={largeImg} alt="depiction" />
      </ModalOpen>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};

export default Modal;
