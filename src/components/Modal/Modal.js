import { useEffect } from 'react';
import css from '../Modal/Modal.module.css';
const { createPortal } = require('react-dom');

const Modal = ({ largeImageURL, tags, onClose }) => {
  const modalRoot = document.querySelector('#modal-root');

  useEffect(() => {

    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // console.log ('mount');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // console.log ('UNMOUNT');
    };
  }, [onClose]);


  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.modal__backdrop} onClick={handleBackdropClick}>
      <div className={css.modal__content}>
        <img src={largeImageURL} alt={`${tags}`} className={css.modal__img} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
















// import css from '../Modal/Modal.module.css';
// const { Component } = require('react');
// const { createPortal } = require('react-dom');

// export default class Modal extends Component {
//   modalRoot = document.querySelector('#modal-root');

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown )
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown',this.handleKeyDown)
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//        this.props.onClose();
//     }
// }

// handleBackdropClick = evt => {
//     if (evt.target === evt.currentTarget) {
//         this.props.onClose();
//     }
// }

//   render() {
//     return createPortal(
//       <div className={css.modal__backdrop} onClick={this.handleBackdropClick}>
//         <div className={css.modal__content}>
//           <img src={this.props.dataForModal.largeImageURL} alt={`${this.props.dataForModal.tags}`} className={css.modal__img} />
//           {/* для largeImageURL */}
//           {/* <img src={this.props.largeImageURL} alt="" className={css.modal__img} /> */}
//         </div>
//       </div>,
//       this.modalRoot
//     );
//   }
// }
