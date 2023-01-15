import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

export function CheckoutLayout(props: LayoutProps) {
  return <>{props.children}</>;
}
