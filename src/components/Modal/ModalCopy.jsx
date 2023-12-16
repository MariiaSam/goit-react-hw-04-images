// import PropTypes from 'prop-types';
// import { createPortal } from 'react-dom';
// import { Component } from 'react';
// import { IoIosCloseCircleOutline } from 'react-icons/io';

// import { ModalBackdrop, ModalContent, Img } from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onClick();
//     }
//   };

//   handleBackdropClick = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClick();
//     }
//   };

//   render() {
//     return createPortal(
//       <ModalBackdrop onClick={this.handleBackdropClick}>
//         <ModalContent>
//           <IoIosCloseCircleOutline
//             type="button"
//             onClick={this.props.onClick}
//             size="24"
//           >
//             Close
//           </IoIosCloseCircleOutline>
//           <Img src={this.props.url} alt={this.props.url}></Img>
//         </ModalContent>
//       </ModalBackdrop>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };
