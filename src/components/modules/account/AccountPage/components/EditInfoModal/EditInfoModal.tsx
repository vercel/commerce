import classNames from "classnames"
import React from "react"
import s from './EditInfoModal.module.scss'

import {ModalCommon, MenuDropdown} from '../../../../../common'

interface EditInfoModalProps {
    visible: boolean;
    closeModal: () => void;
}

const EditInfoModal = ({ visible = false, closeModal }: EditInfoModalProps) => {

    function saveInfo() {
        console.log("saved !!!");

        closeModal();
    }

    const options = [
        {name: "hihi"},
        {name: "hihi"},
        {name: "hihi"}
    ]

    return (
        <ModalCommon onClose={closeModal} visible={visible} title="Edit Infomation">
            <section className={s.editInfoModal}>
                <div><input className={s.input} type="text" name="" placeholder="Name" /></div>
                <div><input className={s.input} type="text" name="" placeholder="Email" /></div>
                <div><input className={s.input} type="text" name="" placeholder="Address" /></div>
                <div><input className={s.input} type="text" name="" placeholder="City" /></div>

                <div>
                    {/* <MenuDropdown options={options} isHasArrow={false} > */}
                        <input className={s.inputState} type="text" name="" placeholder="State" />
                    {/* </MenuDropdown> */}
                    <input className={s.inputPostalCode} type="text" name="" placeholder="hehe" />
                </div>
                
                <div><input className={s.inputPhoneNumber} type="text" name="" placeholder="Phone number" /></div>

                <div className={s.buttons}>
                    <div onClick={closeModal} className={s.buttonCancel}>Cancel</div>
                    <div onClick={saveInfo} className={s.buttonSave}>Save</div>
                </div>
            </section>
        </ModalCommon>
    )
}

export default EditInfoModal