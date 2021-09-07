import classNames from "classnames"
import React, { useState } from "react"
import s from './EditInfoModal.module.scss'

import {ModalCommon, MenuDropdown} from '../../../../../common'

interface EditInfoModalProps {
    accountInfo: {name: string, email: string, address: string, state: string, city: string, postalCode: string, phoneNumber: string};
    visible: boolean;
    closeModal: () => void;
}

const EditInfoModal = ({ accountInfo, visible = false, closeModal }: EditInfoModalProps) => {

    const [name, setName] = useState(accountInfo.name);
    const [email, setEmail] = useState(accountInfo.email);
    const [address, setAddress] = useState(accountInfo.address);
    const [state, setState] = useState(accountInfo.state);
    const [city, setCity] = useState(accountInfo.city);
    const [postalCode, setPostalCode] = useState(accountInfo.postalCode);
    const [phoneNumber, setPhoneNumber] = useState(accountInfo.phoneNumber);

    function saveInfo() {
        console.log("saved !!!");

        closeModal();
    }

    const states = [
        {name: "D1", onClick: () => {setState("D1")}},
        {name: "D2", onClick: () => {setState("D2")}},
        {name: "D3", onClick: () => {setState("D3")}}
    ]

    return (
        <ModalCommon onClose={closeModal} visible={visible} title="Edit Infomation">
            <section className={s.editInfoModal}>
                <div>
                    <input className={s.input} type="text" name="name" placeholder="Name"
                        value={name} onChange={e => {setName(e.target.value)}} />
                </div>
                <div>
                    <input className={s.inputDisable} type="text" name="email" placeholder="Email"
                        value={email} onChange={e => {setEmail(e.target.value)}} />
                </div>
                <div>
                    <input className={s.input} type="text" name="address" placeholder="Address" 
                        value={address} onChange={e => {setAddress(e.target.value)}}/>
                </div>
                <div>
                    <input className={s.input} type="text" name="city" placeholder="City"
                        value={city} onChange={e => {setCity(e.target.value)}} />
                    </div>

                <div className="flex">
                    <div className={s.inputStateWrapper}>
                        <MenuDropdown options={states} isHasArrow={true} >
                            <input className={s.inputState} type="text" name="state" placeholder="State"
                                value={state} disabled />
                        </MenuDropdown>
                    </div>
                    
                    <input className={s.inputPostalCode} type="text" name="postalCode" placeholder="Postal code"
                        value={postalCode} onChange={e => {setPostalCode(e.target.value)}} />
                </div>
                
                <div>
                    <input className={s.inputPhoneNumber} type="text" name="phoneNumber" placeholder="Phone number"
                        value={phoneNumber} onChange={e => {setPhoneNumber(e.target.value)}} />
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