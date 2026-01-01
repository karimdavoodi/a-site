'use client';

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Modal = ({ show, onClose, content }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <a href="#" onClick={handleCloseClick} style={styles.closeButton}>
            x
          </a>
        </div>
        <div style={styles.body}>{content}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    const modalRoot = document.getElementById('modal-root');
    return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
  } else {
    return null;
  }
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    width: '500px',
    borderRadius: '8px',
    padding: '20px',
    zIndex: 1001,
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '25px',
  },
  closeButton: {
    textDecoration: 'none',
    color: 'black',
  },
  body: {
    marginTop: '10px',
  },
};

export default Modal;
