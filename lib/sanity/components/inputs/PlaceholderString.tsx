import {StringInputProps, useFormValue, SanityDocument, StringSchemaType} from 'sanity'
import get from 'lodash.get'

type Props = StringInputProps<StringSchemaType & {options?: {field?: string}}>

const PlaceholderStringInput = (props: Props) => {
  const {schemaType} = props

  const path = schemaType?.options?.field
  const doc = useFormValue([]) as SanityDocument

  const proxyValue = path ? (get(doc, path) as string) : ''

  return props.renderDefault({
    ...props,
    elementProps: {placeholder: proxyValue, ...props.elementProps},
  })
}

export default PlaceholderStringInput
