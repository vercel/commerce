import s from './MenuFilter.module.scss';
import MenuFilterItem from './MenuFilterItem/MenuFilterItem';

interface Props {
    children?: any,
    heading?: string,
    categories: { name: string, slug?: string, code?: string }[],
    type: string,
    onChange: (value: string, type: string, isSellect?: boolean) => void
}

const MenuFilter = ({ heading, categories, type, onChange }: Props) => {
    function handleChange(value: string, isSellect: boolean) {
        onChange(value, type, isSellect)
    }

    return (
        <section className={s.menuFilterWrapper}>
            <h2 className={s.menuFilterHeading}>{heading}</h2>
            <ul className={s.menuFilterList}>
                {
                    categories.map(item => <MenuFilterItem
                        key={item.slug || item.code}
                        name={item.name}
                        type={type}
                        value={item.slug || item.code || ''}
                        onChange={handleChange}
                    />)
                }
            </ul>
        </section>
    )
}

export default MenuFilter
