import styles from './Modal.styles';

const Modal = ({ children, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};
export default Modal;
