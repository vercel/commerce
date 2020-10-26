const Info = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      shape-rendering="geometricPrecision"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="transparent" />
      <path d="M12 8v4" stroke="currentColor" />
      <path d="M12 16h.01" stroke="currentColor" />
    </svg>
  )
}

export default Info
