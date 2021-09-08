import { useState } from 'react'
import { ButtonCommon, Layout, ModalInfo } from 'src/components/common'
import TabPane from 'src/components/common/TabCommon/components/TabPane/TabPane'
import TabCommon from 'src/components/common/TabCommon/TabCommon'
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
      <TabCommon center={true}>
        <TabPane
          active={true}
          tabName={'dat datdat datdatdatdatdatdat'}
        >
          <div className="w-full">
          datdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdat
          </div>
        </TabPane>
        <TabPane active={true} tabName={'1234567890'}>
        <div className="w-full">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit harum sint maiores optio? Perspiciatis, necessitatibus pariatur, ut sed aperiam minus reiciendis alias deleniti eligendi obcaecati illum id maxime accusantium beatae.
          </div>
        </TabPane>
        <TabPane active={true} tabName={'1'}>
        <div className="w-full">
          11111111111111111111111111111111111111111111111111111111111
          </div>
        </TabPane>
      </TabCommon>
    </>
  )
}

Test.Layout = Layout
