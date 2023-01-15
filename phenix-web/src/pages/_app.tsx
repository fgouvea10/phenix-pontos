import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { AuthLayout, CheckoutLayout, DashboardLayout } from "../layouts";

import "../styles/globals.css";

function NormalLayout(props: any) {
  return <>{props.children}</>
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let Layout;

  switch (router.pathname) {
    case "/auth/sign-in":
    case "/auth/create-account":
      Layout = AuthLayout;
      break;

    case "/checkout":
    case "/checkout/success":
      Layout = CheckoutLayout;
      break;

    case '/':
      Layout = NormalLayout
      break;

    default:
      Layout = DashboardLayout;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
