import React, { useState } from 'react'
import s from "./QuanittyInput.module.scss"
interface QuanittyInputProps {
    
}

const QuanittyInput = (props: QuanittyInputProps) => {
    const [value, setvalue] = useState(0)
    return (
        <div>
            <input type="number" value={value} onChange={(e)=>setvalue(+e.target.value)} className={s.quanittyInput}/>
        </div>
    )
}

export default QuanittyInput
