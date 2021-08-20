import { FC } from 'react'
import s from './Header.module.scss'

interface Props {
    className?: string
    children?: any
}

const Header: FC<Props> = ({ }: Props) => {
    return (
        <div className={s.header}>
            This is Header
            <button className={s.btnBlue}>
                Button
            </button>
            <button className={s.btn}>
                Button
            </button>
            <div className={s.link}>
                Test link style
            </div>
            <h1 className="heading-1">
                HEADING 1
            </h1>
            <p className="spacing-horizontal">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt delectus, atque aliquid repudiandae debitis dolor facere impedit alias nemo dolores voluptatum? Commodi, delectus. Dignissimos aspernatur nobis, distinctio delectus eligendi nisi illo tempore non nostrum, molestias excepturi dolor culpa fugiat rem perspiciatis. Repellendus numquam quisquam possimus natus vero recusandae, ipsam earum ratione quos ex consectetur cum nostrum modi amet odit fugiat fugit. Facere cum enim dignissimos molestias facilis error dicta exercitationem, delectus voluptates fuga laboriosam esse sunt odio, impedit modi veritatis, nisi nam? Voluptatum voluptas similique aspernatur. Soluta, accusamus! Mollitia praesentium adipisci perspiciatis iusto dolorum sint sit placeat, nesciunt id repellendus.
            </p>
            <p className="spacing-horizontal-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque doloremque quos excepturi laborum maiores laudantium hic iusto natus? Ipsa deleniti quas odit! Labore esse enim ipsam tempora tenetur beatae maxime officiis est, a illo! Soluta suscipit maxime odit eveniet laudantium, iure atque doloribus quaerat. Obcaecati tempore molestiae aliquid amet maiores suscipit, beatae repellat illum ipsam tenetur. Porro officiis omnis quam, iure quia necessitatibus consectetur culpa itaque, in tempora rem ex ad et iusto, hic commodi fuga quibusdam. Dolores exercitationem natus dolor pariatur voluptates non corporis, minus repellat! Quis distinctio esse, animi suscipit ducimus sequi obcaecati facere, perferendis ea omnis soluta.
            </p>
            <p className={s.paragraph}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, natus?
            </p>
        </div>
    )
}

export default Header
