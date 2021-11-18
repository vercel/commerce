import React from 'react';
import { useMessage } from 'src/components/contexts';
import { useRemoveCouponCode } from 'src/components/hooks/order';
import { IconClose } from 'src/components/icons';
import s from './PromotionItem.module.scss';

interface Props {
    code: string
}

const PromotionItem = ({ code }: Props) => {
    const { removeCouponCode, loading } = useRemoveCouponCode()
    const { showMessageSuccess, showMessageError } = useMessage()

    const handleRemoveCouponCode = () => {
        removeCouponCode(code, handleRemoveCouponCodeCallBack)
    }
    const handleRemoveCouponCodeCallBack = (isSuccess: boolean, message?: string) => {
        if (isSuccess) {
            showMessageSuccess('Removed coupon code successfully')
        } else {
            showMessageError(message)
        }
    }

    return (
        <div className={s.promotionItem}>
            {code}
            <div className={s.iconClose} onClick={handleRemoveCouponCode} >
                <IconClose />
            </div>
        </div>
    );
};

export default PromotionItem;