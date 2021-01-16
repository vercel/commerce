import s from './LoadingDots.module.css'

const LoadingDots: React.FC = () => {
  return (
    <span className={s.root} >
      <i></i>
      <i></i>
      <i></i>
    </span>
  )
}

export default LoadingDots
