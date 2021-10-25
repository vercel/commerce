import React from 'react';
import { ModalConfirm } from 'src/components/common';
import { LANGUAGE } from 'src/utils/language.utils';
import s from './ModalConfirmLogin.module.scss'

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
                <div className={s.modalConfirmLogin}>
                    <p> Account already exists for email {email} </p>
                    <p>Please signin to continue or use another email</p>
                </div>
            </ModalConfirm>
        </div>
    );
};

export default ModalConfirmLogin;