import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

export function AuthLayout(props: LayoutProps) {
  return <>{props.children}</>;
}
