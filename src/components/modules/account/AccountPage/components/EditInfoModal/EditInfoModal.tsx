import React from "react"
import s from './EditInfoModal.module.scss'

import { ModalCommon, Inputcommon, SelectCommon } from '../../../../../common'

interface EditInfoModalProps {
    accountInfo: {name: string, email: string, address: string, state: string, city: string, postalCode: string, phoneNumber: string};
    visible: boolean;
    closeModal: () => void;
}

const EditInfoModal = ({ accountInfo, visible = false, closeModal }: EditInfoModalProps) => {

    function saveInfo() {
        console.log("saved !!!");

        closeModal();
    }

    const states = [
        {name: "District 1", value: "D1"},
        {name: "District 2", value: "D2"},
        {name: "District 3", value: "D3"}
    ]

    return (
        <ModalCommon onClose={closeModal} visible={visible} title="Edit Infomation">
            <section className={s.editInfoModal}>
                <div className={s.input}>
                    <Inputcommon placeholder="Name" value={accountInfo.name} type="text" />
                </div>

                <div className={s.inputDisable}>
                    <Inputcommon placeholder="Email" value={accountInfo.email} type="email" />
                </div>

                <div className={s.input}>
                    <Inputcommon placeholder="Address" value={accountInfo.address} type="text" />
                </div>
                
                <div className={s.input}>
                    <Inputcommon placeholder="City" value={accountInfo.city} type="text" />
                </div>
                

                <div className="flex">
                    <div className={s.inputState}>
                        <SelectCommon type="custom" placeholder="State" option={states} />
                    </div>

                    <div className={s.inputPostalCode}>
                        <Inputcommon placeholder="Postal code" value={accountInfo.postalCode} type="text" />
                    </div>
                </div>

                <div className={s.inputPhoneNumber}>
                    <Inputcommon placeholder="Phone number" value={accountInfo.phoneNumber} type="text" />
                </div>

                <div className={s.buttons}>
                    <div onClick={closeModal} className={s.buttonCancel}>Cancel</div>
                    <div onClick={saveInfo} className={s.buttonSave}>Save</div>
                </div>
            </section>
        </ModalCommon>
    )
}

export default EditInfoModal