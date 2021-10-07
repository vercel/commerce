import s from './SelectCommon.module.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { IconVectorDown } from 'src/components/icons'
import SelectOption from './SelectOption/SelectOption'

interface Props {
    selected?:string|null,
    initValue?:string|null,
    placeholder? : string,
    size?: 'base' | 'large',
    type?: 'default' | 'custom',
    option: {name: string, value: string}[],
    onChange?: (value: string) => void,
}

const SelectCommon = ({selected,initValue, type = 'default', size = 'base', option, placeholder, onChange}: Props) => {
    const [selectedName, setSelectedName] = useState(placeholder)
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(()=>{
        const nameSelect = option.find((val)=>val.value === selected);
        setSelectedName(nameSelect?.name);
        setSelectedValue(initValue ?? '');
        onChange && onChange(initValue ?? '');
    },[])

    const changeSelectedName = (item:string, value: string) => {
        setSelectedValue(value)
        setSelectedName(item)
        onChange && onChange(value)
    }
    return(
        <>
            <div className={classNames({
                [s.select] : true,
                [s[size]] : !!size,
                [s[type]] : !!type,
            })}
            >
                <div className={classNames({
                    [s.selectTrigger] : true,
                    
                })}
                >{selectedName}<IconVectorDown /></div>
                
                <div className={s.hoverWrapper}>
                    <div className={classNames({
                        [s.selectOptionWrapper] : true,
                        [s[type]] : !!type,
                        [s[size]] : !!size,
                    })}
                    >   
                        {
                            option.map(item => 
                                <SelectOption key={item.value} itemName={item.name} value={item.value} onClick={changeSelectedName} size={size} selected={(selectedValue === item.value)} />
                            )
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default SelectCommon