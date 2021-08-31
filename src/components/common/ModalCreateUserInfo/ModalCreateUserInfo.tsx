import classNames from 'classnames';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useModalCommon } from 'src/components/hooks/useModalCommon';
import { CustomInputCommon } from 'src/utils/type.utils';
import { Inputcommon } from '..';
import ButtonCommon from '../ButtonCommon/ButtonCommon';
import ModalCommon from '../ModalCommon/ModalCommon';
import s from './ModalCreateUserInfo.module.scss';

// todo: remove
interface Props {
    demoVisible: boolean,
    demoCloseModal: () => void,
}


const ModalCreateUserInfo = ({ demoVisible: visible, demoCloseModal: closeModal }: Props) => {
    // const { visible, closeModal } = useModalCommon({ initialValue: false})
    const firstInputRef = useRef<CustomInputCommon>(null)

    return (
        <ModalCommon visible={visible} onClose={closeModal} title='Enter your Information'>
            <div className={s.formUserInfo}>
                <div className={s.inner}>
                    <div className={s.body}>
                        <Inputcommon placeholder='Street Address' ref={firstInputRef} />
                        <Inputcommon placeholder='City' />
                        <div className={s.line}>
                            {/* todo: select, not input */}
                            <Inputcommon placeholder='State' />
                            <Inputcommon placeholder='Zip code' />
                        </div>
                        <Inputcommon placeholder='Phone (delivery contact)' />
                    </div>
                    <div className={s.bottom}>
                        <ButtonCommon size='large' onClick={closeModal} type='light'>Skip</ButtonCommon>
                        <ButtonCommon size='large'>Submit</ButtonCommon>
                    </div>
                </div>
            </div>
        </ModalCommon>
    );
}

export default ModalCreateUserInfo;