const Logo = ({ className = '', ...props }) => (
  <img src='../../../ckube_small.svg'
    width="32"
    height="32"
    className={className}
    {...props}
    alt="ckube"></img>
)

export default Logo
