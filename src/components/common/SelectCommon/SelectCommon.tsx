import s from './SelectCommon.module.scss'
import classNames from 'classnames'

interface Props {
    placeHolder? : string,
    size?: 'base' | 'large',
    type?: 'default' | 'custom',
    option: {name: string}[],
}

const SelectCommon = ({ type = 'default', size = 'base', option, placeHolder }: Props) => {
    return(
        <select className={classNames({
            [s.select] : true,
            [s[type]]: !!type,
            [s[size]]: !!size,
        })}
        >
            <option disabled selected hidden>{placeHolder}</option>
            {
                option.map(item => <option className={s.option} value={item.name}> {item.name} </option>)
            }
        </select>
    )
}

export default SelectCommon