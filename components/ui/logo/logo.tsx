const Logo = ({ className = 'w-auto h-8', ...props }) => {  
  return (
    <div className="flex items-center space-x-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 80"
        className={className}
        {...props}
      >
        <path
          fill="currentColor"
          d="M54.6,0C32.8,0,15.1,17.9,15.1,40c0,10.6,4.3,18.1,4.6,18.8h20.6c-0.7-0.5-9.1-6.9-9.1-18.8  c0-13.1,10.5-23.7,23.4-23.7S78,26.9,78,40S67.5,63.7,54.6,63.7H0V80h54.6c21.8,0,39.5-17.9,39.5-40S76.5,0,54.6,0z"
        />
        <path
          fill="currentColor"
          d="M109,63.7V80H75.3c7.2-3.7,13.2-9.4,17.4-16.3H109z"
        />
      </svg>
      <span className="sr-only">KM Storefront</span>
    </div>
  )
}

export default Logo
