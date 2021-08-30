import React, { useRef } from 'react'
import { ButtonCommon, Inputcommon } from 'src/components/common'
import { CustomInputCommon } from 'src/utils/type.utils';
import s from './FormSubscribe.module.scss'


const FormSubscribe = () => {
    const inputElementRef = useRef<CustomInputCommon>(null);

    const handleSubmit = (e?: any) => {
        // todo
        let value: string
        if (typeof (e) === 'string') {
            value = e
        } else {
            e.preventDefault && e.preventDefault()
            value = inputElementRef.current?.getValue()?.toString() || ''
        }
        console.log("email here: ", value)
    }

    return (
        <section className={s.formSubscribe}>
            <Inputcommon
                type='email'
                styleType='custom'
                placeholder="Enter your email"
                ref={inputElementRef}
                onEnter={handleSubmit}
                backgroundTransparent={true}
            />
            <ButtonCommon onClick={handleSubmit} type='lightBorderNone'>Subsribe</ButtonCommon>
        </section>
    )
}

export default FormSubscribe
