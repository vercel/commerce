import SkeletonImage from "../SkeletonCommon/SkeletonImage/SkeletonImage"
import SkeletonParagraph from "../SkeletonCommon/SkeletonParagraph/SkeletonParagraph"
import s from './ProductCardSkeleton.module.scss'

const ProductCardSkeleton = ({ }) => {

  return (
    <div className={s.productCardSkeleton}>
      <SkeletonImage />
      <div className={s.content}>
        <SkeletonParagraph rows={3} />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
