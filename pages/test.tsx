import { Layout, MessageCommon } from 'src/components/common'
import { MessageItemProps } from 'src/components/common/MessageCommon/MessageItem/MessageItem'

const data: MessageItemProps[] = [
  {
    id: 1,
    content: 'Create account successfully',
    type: 'error',
  },
  {
    id: 2,
    content: 'Create account successfully',
    type: 'success',
  },
  {
    id: 3,
    content: 'Create account successfully',
    type: 'warning',
  },
  {
    id: 4,
    content: 'Create account successfully',
    type: 'info',
  },
]
export default function Test() {
  return (
    <>
      <MessageCommon messages={data} />
      {/* <MessageCommon type='error'>Create account successfully</MessageCommon>
      <MessageCommon type='info'>Create account successfully</MessageCommon>
      <MessageCommon type='warning'>Create account successfully</MessageCommon> */}
    </>
  )
}

Test.Layout = Layout
