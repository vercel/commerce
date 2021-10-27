import classNames from "classnames"
import { Field } from "formik"
import { useMemo } from "react"
import { IconCheck, IconError } from "src/components/icons"
import s from './SelectFieldInForm.module.scss'


interface Props {
  placeholder?: string
  styleType?: 'default' | 'custom'
  backgroundTransparent?: boolean
  icon?: React.ReactNode
  isIconSuffix?: boolean
  isShowIconSuccess?: boolean
  name: string
  error?: string
  options: any[]
  keyNameOption?: string[]
  keyValueOption?: string
  nameSeperator?: string

}

const SelectFieldInForm = ({
  name,
  placeholder,
  options,
  styleType = 'default',
  icon,
  backgroundTransparent = false,
  isIconSuffix = true,
  isShowIconSuccess,
  error,
  keyNameOption = ['name'],
  keyValueOption = 'value',
  nameSeperator = " ",
  
}: Props) => {
  const iconElement = useMemo(() => {
    if (error) {
      return (
        <span className={s.icon}>
          <IconError />{' '}
        </span>
      )
    } else if (isShowIconSuccess) {
      return (
        <span className={s.icon}>
          <IconCheck />{' '}
        </span>
      )
    } else if (icon) {
      return <span className={s.icon}>{icon} </span>
    }
    return <></>
  }, [icon, error, isShowIconSuccess])

  return (
    <div
      className={classNames({
        [s.inputWrap]: true,
        [s[styleType]]: true,
        [s.bgTransparent]: backgroundTransparent,
      })}
    >
      <div
        className={classNames({
          [s.inputInner]: true,
          [s.preserve]: isIconSuffix,
          [s.success]: isShowIconSuccess,
          [s.error]: !!error,
        })}
      >
        {iconElement}
        <Field
          as="select"
          name={name}
          placeholder={placeholder}
        >
          {
            options.map((item) => {
              let name = ''
              keyNameOption.map((key) => {
                if (name) {
                  name += nameSeperator
                }
                name += item[key] 
              })
              name = name.trim()
              return <option
                key={item[keyValueOption]}
                value={item[keyValueOption]}
              >
                {name}
              </option>
            })
          }
        </Field>

      </div>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  )
}

export default SelectFieldInForm
