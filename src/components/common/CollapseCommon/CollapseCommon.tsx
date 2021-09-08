import CollapseChild from './CollapseChild/CollapseChild'

interface CollapseCommonProps{
    data: {title: string, content: string}[],
}

const CollapseCommon = ({data}: CollapseCommonProps) => {
    return (
        <section>
            {
                data.map((item,index) =>
                    <CollapseChild key={`${item.title}-${index}`} title={item.title} content={item.content} />
                )
            }
        </section>
    )
}

export default CollapseCommon
