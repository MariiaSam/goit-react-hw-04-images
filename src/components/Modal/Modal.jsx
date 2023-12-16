import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { ModalBackdrop, ModalContent, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClick, url }) => {
useEffect (() => {
  const  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
     onClick();
    }
}

    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClick])

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
  onClick();
    }
  };


    return createPortal(
      <ModalBackdrop onClick={handleBackdropClick}>
        <ModalContent>
          <IoIosCloseCircleOutline
            type="button"
            onClick={onClick}
            size="24"
          >
            Close
          </IoIosCloseCircleOutline>
          <Img src={url} alt={url}></Img>
        </ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
    }

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
