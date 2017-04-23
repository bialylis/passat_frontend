import React from 'react';
import './Modal.scss';

const Modal = ({title, children}) => (
    <div className="modal-overlay">
      <div className="modal">
          <strong className="title">
              {title}
          </strong>
          {children}
      </div>
    </div>
);

export default Modal;