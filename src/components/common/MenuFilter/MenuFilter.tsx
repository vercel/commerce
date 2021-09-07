import classNames from 'classnames'
import { useEffect, useState } from 'react';

import s from './MenuFilter.module.scss'
interface Props {
    children?: any,
    heading?:string,
    categories:{name:string,link:string}[],
    type:string,
    onChangeValue?: (value: Object) => void
}

const MenuFilter = ({heading,categories,type,onChangeValue}:Props)=> {
    const [active, setActive] = useState<string>('');

    function handleClick(link:string){
        setActive(link);

        if(active === link){
            setActive('');
        }
    }

    useEffect(()=>{
      
        let href = active?.split("=");
        const linkValue = href[1];

        onChangeValue && onChangeValue({[type]:linkValue});
    },[active]) 
  
    return (
        <section className={s.menuFilterWrapper}>
            <h2 className={s.menuFilterHeading}>{heading}</h2>
            <ul className={s.menuFilterList}>
                {
                    categories.map(item => <li key={item.name}>
                        <div onClick={()=> handleClick(item.link)} className={classNames({ [s.active]: item.link === active? true: false })}>
                            {item.name}
                        </div>
                    </li>)
                }
            </ul>
        </section>
    )
}

export default MenuFilter
