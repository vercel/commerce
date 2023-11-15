'use client';
import cn from 'clsx';
export default function FormButton({
  variant = 'primary'
}: {
  btnText: string;
  state?: string;
  variant?: 'primary' | 'outline';
}) {
  const buttonClasses = cn({
    'bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full':
      variant === 'primary',
    'text-left text-primary/50 ml-6 text-sm': variant === 'outline'
  });
  return (
    <div className="flex items-center justify-between">
      <button className={buttonClasses} type="submit">
        Submit
      </button>
    </div>
  );
}
