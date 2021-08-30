import s from './SelectCommon.module.scss'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { IconVectorDown } from 'src/components/icons'

interface Props {
    children? : React.ReactNode,
    size?: 'base' | 'large',
    type?: 'default' | 'custom',
    option: {name: string}[],
}

const SelectCommon = ({ type = 'default', size = 'base', option, children }: Props) => {
    const [isActive, setActive] = useState(false)
    const [selectedName, setSelectedName] = useState(children)
    const ref = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (!ref?.current || ref?.current.contains(target as Node)) {
                return 
            }
            else{
                setActive(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref])

    const changeActiveStatus = () => {
        setActive(!isActive)
    }

    const changeSelectedName = (props:string) => {
        setSelectedName(props)
    }

    return(
        <>
            <div className={classNames({
                [s.select] : true,
                [s[size]] : !!size,
                [s[type]] : !!type,
                [s.isActive] : isActive,
            })}
                onClick = { changeActiveStatus }
                ref = {ref}
            >
                <div className={classNames({
                    [s.selectTrigger] : true,
                    
                })}
                >{selectedName}<IconVectorDown /></div>

                <div className={classNames({
                    [s.selectOptionWrapper] : true,
                    [s[type]] : !!type,
                    [s[size]] : !!size,
                })}
                >   
                    {
                        option.map(item => 
                            <div className={classNames({
                                [s.selectOption] : true,
                                [s[size]] : !!size,
                            })}
                                onClick = { changeSelectedName(item.name) }
                            >{item.name}</div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default SelectCommon