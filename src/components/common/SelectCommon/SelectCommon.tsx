import s from './SelectCommon.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
import { IconVectorDown } from 'src/components/icons'
import SelectOption from './SelectOption/SelectOption'

interface Props {
    placeholder? : string,
    size?: 'base' | 'large',
    type?: 'default' | 'custom',
    option: {name: string, value: string}[],
    onChange?: (value: string) => void,
}

const SelectCommon = ({ type = 'default', size = 'base', option, placeholder, onChange }: Props) => {
    const [selectedName, setSelectedName] = useState(placeholder)

    const changeSelectedName = (item:string, value: string) => {
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
                                <SelectOption itemName={item.name} value={item.value} onClick={changeSelectedName} size={size} selected={(selectedName === item.name) ? true : false} />
                            )
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default SelectCommon