import SkeletonImage from "../SkeletonCommon/SkeletonImage/SkeletonImage"
import SkeletonParagraph from "../SkeletonCommon/SkeletonParagraph/SkeletonParagraph"
import s from './ProductCardSkeleton.module.scss'
type Props = {
  isBlog?:boolean
}
const ProductCardSkeleton = ({isBlog=false }) => {

  return (
    <div className={s.productCardSkeleton}>
      <SkeletonImage />
      <div className={s.content}>
        <SkeletonParagraph rows={isBlog ? 2 : 3} />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
