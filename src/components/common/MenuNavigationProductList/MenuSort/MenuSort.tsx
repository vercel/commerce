import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import s from './MenuSort.module.scss';

interface Props {
    children?: any,
    heading:string,
    type:string,
    onChangeValue?: (value: Object) => void
}
const SORT = [
    {
        name: 'By Name',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.SORTBY}=by-name`,
    },
    {
        name: 'Price(High to Low)',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.SORTBY}=high-to-low`,
    },
    {
        name: 'Price (Low to High)',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.SORTBY}=low-to-high`,
    },
    {
        name: 'On Sale',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.SORTBY}=on-sale`,
    },
  ];


const MenuSort = ({heading,type,onChangeValue}:Props)=> {
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
        <section className={classNames(s.menuSortWrapper)}>
            <h2 className={classNames(s.menuSortHeading)}>{heading}</h2>
            <ul className={s.menuSortList}>
                {
                    SORT.map(item => <li key={item.name}>
                        <div onClick={()=> handleClick(item.link)} className={classNames({ [s.active]: item.link === active? true: false })}>
                            {item.name}
                        </div>
                    </li>)
                }
            </ul>
        </section>
    )
}

export default MenuSort
