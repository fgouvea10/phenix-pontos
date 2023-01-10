import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { CircleNotch } from 'phosphor-react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingMessage?: string;
  children: ReactNode;
  icon?: ReactElement;
};

export function Button({
  children,
  loading,
  loadingMessage,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={loading}
      className="w-full p-4 text-white font-semibold uppercase flex gap-2 items-center justify-center text-sm hover:opacity-80 transition-opacity; bg-stone-900"
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
