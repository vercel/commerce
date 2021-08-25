import React,{useState,useEffect} from 'react';
import s from './CheckboxCommon.module.scss';
import classNames from 'classnames';

interface CheckboxProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' 
    >{
    onChange?: (value: boolean) => void,
    defaultChecked?: boolean
}

const CheckboxCommon = ({onChange,defaultChecked = true,...props}: CheckboxProps) =>{
    
    const [value, setValue] = useState<boolean>();

    useEffect(()=>{
        onChange && onChange(value)
    },[value])


    const onValueChange = (e: ChangeEvent<HTMLInputElement>)=>{
        let value =e.target.checked;
        setValue(value);
    }

    return (
        <div className={classNames(s.checkboxCommonWarper)}>
             <label className={classNames(s.checkboxItem)}>
                <input id="check" defaultChecked={defaultChecked} className={s.checkboxInput} type="checkbox" onChange={onValueChange}/>
                <span className={s.checkMark}></span>
             </label>
             <div className={classNames(s.checkboxText)}>
                <label for="check"> Billing address is same as shipping </label>
             </div>
        </div>
    )
}

export default CheckboxCommon;