import React from 'react';
import { ModalConfirm } from 'src/components/common';
import { LANGUAGE } from 'src/utils/language.utils';

interface Props {
    visible: boolean
    closeModal: () => void
    handleOk: () => void
    email: string
}

const ModalConfirmLogin = ({ visible, closeModal, handleOk, email }: Props) => {
    return (
        <div>
            <ModalConfirm
                visible={visible}
                onClose={closeModal}
                onOk={handleOk}
                okText={LANGUAGE.BUTTON_LABEL.SIGNIN}
                cancelText="Change email address"
            >
                <div>
                    <p> Account already exists for email {email} </p>
                    <p>Please signin to continue or use another email</p>
                </div>
            </ModalConfirm>
        </div>
    );
};

export default ModalConfirmLogin;