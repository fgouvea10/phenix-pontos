import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { CircleNotch } from 'phosphor-react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingMessage?: string;
  children: ReactNode;
  icon?: ReactElement;
  className?: string;
  variant?: 'primary' | 'secondary'
};

export function Button({
  children,
  loading,
  loadingMessage,
  icon,
  className,
  variant = 'primary',
  ...rest
}: ButtonProps) {

  if (variant === 'secondary') return (
    <button
      type="button"
      disabled={loading}
      className={clsx('w-full overflow-hidden p-4 text-stone-500 font-semibold uppercase flex gap-2 items-center justify-center text-sm hover:brightness-95 transition-all bg-stone-200', className)}
      {...rest}
    >
      {!!loading ? (
        <>
          <CircleNotch className="animate-spin" />
          {loadingMessage}
        </>
      ) : (
        children
      )}
    </button>
  )

  return (
    <button
      type="button"
      disabled={loading}
      className={clsx('w-full overflow-hidden p-4 text-white font-semibold uppercase flex gap-2 items-center justify-center text-sm hover:opacity-90 transition-opacity bg-stone-900', className)}
      {...rest}
    >
      {!!loading ? (
        <>
          <CircleNotch className="animate-spin" />
          {loadingMessage}
        </>
      ) : (
        children
      )}
    </button>
  );
}
