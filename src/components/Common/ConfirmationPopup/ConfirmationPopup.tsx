import React, { ReactNode } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

interface ConfirmationPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: ReactNode;  // Thay 'string' thành 'ReactNode' để hỗ trợ JSX
    onConfirm: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ isOpen, onClose, title, message, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>
                {title}
            </ModalHeader>
            <ModalBody>
                {message} {/* Có thể hiển thị JSX ở đây */}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onConfirm}>
                    Có
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Không
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationPopup;
