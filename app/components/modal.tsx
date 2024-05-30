'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const modalContent = (
    <div className='modal'>
      <div className='modal-content'>
        <div className='flex items-center justify-end'>
          <button onClick={onClose}>x</button>
        </div>
        <div className='p-3 md:p-5 mt-5'>{children}</div>
      </div>
    </div>
  );
  return mounted ? createPortal(modalContent, document.body) : null;
};

export default Modal;
