import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactElement,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactElement;
  error?: string;
  id: string;
  onIconClick?: () => void;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, id, icon, error, onIconClick, ...rest },
  ref,
) => {
  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full">
        <input
          type="text"
          id={id}
          placeholder=" "
          className={`${!!error && '!border-red-600'} font-light block w-full appearance-none border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0 peer`}
          ref={ref}
          {...rest}
        />
        <label
          htmlFor={id}
          className={`${
            !!error && '!text-red-600'
          } cursor-auto font-extralight absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-black`}
        >
          {label}
        </label>
        {!!icon && (
          <button
            type="button"
            className="absolute flex items-center justify-center bg-transparent border-0 inset-y-0 right-0 pr-3"
            onClick={onIconClick}
          >
            {icon}
          </button>
        )}
      </div>
      {!!error && <p className="text-sm !text-red-600">{error}</p>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
