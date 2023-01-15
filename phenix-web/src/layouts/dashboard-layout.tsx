import { ReactNode } from "react"

import { Header } from "../components/layout/header"

export interface LayoutProps {
  children: ReactNode
}

export function DashboardLayout(props: LayoutProps) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      {props.children}
    </div>
  )
}
