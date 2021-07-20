import Image from 'next/image'
import MainLogo from '../../../public/main-logo.png'

const Logo = ({ className = '', ...props }) => (
  <Image src={MainLogo} width={35} height={35} />
)

export default Logo
