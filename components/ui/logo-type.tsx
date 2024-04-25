// import clsx from 'clsx';

// export default function LogoType({ size }: { size?: 'sm' | undefined }) {
//   return (
//     <div
//       className={clsx(
//         'flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
//         {
//           'h-[40px] w-[40px] rounded-xl': !size,
//           'h-[30px] w-[30px] rounded-lg': size === 'sm'
//         }
//       )}
//     >
//       {/* <LogoIcon
//         className={clsx({
//           'h-[16px] w-[16px]': !size,
//           'h-[10px] w-[10px]': size === 'sm'
//         })}
//       /> */}
//       <img src="/logo-white" alt="scape squared typographic logo" />
//     </div>
//   );
// }

export default function LogoType(props: React.ComponentProps<'img'>) {
  return (
    <img src="/logo-white.png" alt="scape squared logo" className="w-24"/>
  );
}