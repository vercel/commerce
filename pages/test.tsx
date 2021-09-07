import { useState } from 'react'
import {
  ButtonCommon,
  Layout, ModalInfo
} from 'src/components/common'

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
      <ModalInfo visible={visible} onClose={onClose}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi qui, esse eos nobis soluta suscipit aliquid nostrum corporis. Nihil eligendi similique recusandae minus mollitia aliquam, molestias fugit tenetur voluptatibus maiores et. Quaerat labore corporis inventore nostrum, amet autem exercitationem eligendi?
      </ModalInfo>
    </>
  )
}

Test.Layout = Layout
