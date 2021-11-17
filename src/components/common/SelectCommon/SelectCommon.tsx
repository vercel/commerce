import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { IconVectorDown } from 'src/components/icons'
import s from './SelectCommon.module.scss'
import SelectOption from './SelectOption/SelectOption'

interface Props {
    initValue?: string,
    placeholder? : string,
    value?: string,
    size?: 'base' | 'large',
    type?: 'default' | 'custom',
    options: {name: string, value?: string , slug?: string }[],
    onChange?: (value: string) => void,
}

const SelectCommon = ({initValue, type = 'default', size = 'base', options, placeholder, onChange}: Props) => {
    const [selectedName, setSelectedName] = useState(placeholder)
    const [selectedValue, setSelectedValue] = useState('')
  
    useEffect(() => {
        if (initValue) {
            const nameSelect = options.find((val) => val.value === initValue || val.slug === initValue);
            setSelectedName(nameSelect?.name || nameSelect?.slug);
            setSelectedValue(initValue);
        }
    }, [initValue, onChange, options])

    const changeSelectedName = (value: string) => {
        setSelectedValue(value)
        const name = options.find(item => item.value === value || item.slug === value)?.name
        setSelectedName(name)
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
                >{selectedName || placeholder}<IconVectorDown /></div>
                
                <div className={s.hoverWrapper}>
                    <div className={classNames({
                        [s.selectOptionWrapper] : true,
                        [s[type]] : !!type,
                        [s[size]] : !!size,
                    })}
                    >   
                        {
                            options.map(item => 
                                <SelectOption key={item.value || item.slug}
                                    itemName={item.name}
                                    value={item.value || item.slug}
                                    onChange={changeSelectedName}
                                    size={size} selected={(selectedValue === item.value ||  selectedValue === item.slug)} />
                            )
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default SelectCommon