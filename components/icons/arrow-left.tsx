export default function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      shapeRendering="geometricPrecision"
      className={className}
    >
      <path d="M19 12H5" />
      <path d="M12 19L5 12L12 5" />
    </svg>
  );
}
