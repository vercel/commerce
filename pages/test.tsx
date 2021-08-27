import { useState } from 'react'
import { ButtonCommon, Layout, ModalCommon } from 'src/components/common'

export default function Test() {
  const [visible, setVisible] = useState(false)
  const onClose = () => {
    setVisible(false)
  }
  const onOpen = () => {
    setVisible(true)
  }
  return (
    <>
      <ButtonCommon onClick={onOpen}>open</ButtonCommon>
      <ModalCommon visible={visible} onClose={onClose} >
				<div className="p-10">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur officiis dolorum ea incidunt. Sint, cum ullam. Labore vero quod itaque, officia magni molestias! Architecto deserunt soluta laborum commodi nesciunt delectus similique temporibus distinctio? Facere eaque minima enim modi magni, laudantium, animi mollitia beatae repudiandae maxime labore error nesciunt, nisi est?
				</div>
			</ModalCommon>
    </>
  )
}

Test.Layout = Layout
