import React from 'react';
import NotiMessage from 'src/components/common/NotiMessage/NotiMessage';
import { IconInfo } from 'src/components/icons';
import s from './HeaderNoti.module.scss';

const HeaderNoti = () => {
    return (
        <NotiMessage>
            <div className={s.headerNoti}>
                <IconInfo />&nbsp;<span>You can buy fresh products after <b>11pm</b> or <b>8am</b></span>
            </div>
        </NotiMessage>
    );
};

export default HeaderNoti;