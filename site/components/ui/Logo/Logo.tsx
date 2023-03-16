import Image from "next/image"

const Logo = ({ className = '', ...props }) => (
  <Image 
    src="/logo.png"
      height="50"
      width="50"
      alt="Safaraabruzzo logo"
  />
)

export default Logo
