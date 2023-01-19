import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface StepProps {
  children: ReactNode;
}

interface StepItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  step: number;
  children: ReactNode;
}

export function StepItem({
  isActive,
  step = 1,
  children,
  ...rest
}: StepItemProps) {
  return (
    <li className="md:flex-1">
      <button
        {...rest}
        type="button"
        className={`
          ${isActive ? "border-black" : "border-gray-200"} w-full
          group pl-4 py-2 flex flex-col border-l-4 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4`}
      >
        <span
          className={`${
            isActive ? "text-black" : "text-gray-500"
          } text-xs font-semibold tracking-wide uppercase`}
        >
          Passo {step}
        </span>
        <span className="text-sm font-light text-gray-500">{children}</span>
      </button>
    </li>
  );
}

export function Steps({ children }: StepProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {children}
      </ol>
    </nav>
  );
}
