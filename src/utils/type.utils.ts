export interface CustomInputCommon extends HTMLInputElement  {
    getValue: () => string | number
    setValue: (value: string) => void 
}
