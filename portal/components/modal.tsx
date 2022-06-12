import React from "react";
import ReactModal from "react-modal"
import styles from '../styles/modal.module.css'
import { Icon } from '@iconify/react';

type ModalProps = {
    children: any
    isOpen: boolean
    onClose: any
}

function Modal({children, isOpen, onClose}: ModalProps) {
    return(
        <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
       >
          {children}
          <button className={styles.closeButton} onClick={onClose}>
              <Icon icon="icomoon-free:cross" className={styles.closeButton} />
         </button>
      </ReactModal>
    )
}

export default Modal