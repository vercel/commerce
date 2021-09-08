import CollapseChild from './CollapseChild/CollapseChild'

interface CollapseCommonProps{
    data: {title: string, content: Array<string>, link: string}[],
}

const CollapseCommon = ({data}: CollapseCommonProps) => {
    return (
        <section>
            {
                data.map(item =>
                    <CollapseChild key={item.title} title={item.title} content={item.content} link={item.link} />
                )
            }
        </section>
    )
}

export default CollapseCommon
