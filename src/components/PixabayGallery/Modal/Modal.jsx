import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, ModalOpen } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  backDropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClick();
    }
  };

  onEscClick = evt => {
    if (evt.code === 'Escape') {
      this.props.onClick();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.backDropClick}>
        <ModalOpen>
          <img src={this.props.largeImg} alt="depiction" />
        </ModalOpen>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};

export default Modal;
