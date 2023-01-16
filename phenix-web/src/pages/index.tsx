import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import type Stripe from "stripe";
import { setCookie } from "nookies";

import { stripe } from "../lib/stripe";

interface Plan {
  id: string;
  name: string;
  price: number
}

interface Props {
  plans: Plan[]
}

export default function Home({ plans }: Props) {
  const router = useRouter();

  function handleSelectPlan(plan: Plan) {
    // localStorage.setItem("phenix:redirect", JSON.stringify(plan?.id));
    setCookie(null, 'phenix:redirect', plan.id, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    router.push(`/checkout?plan=${plan.id}`);
  }

  return (
    <div>
      <h1>Planos</h1>
      <ul>
        {plans.map(plan => (
          <>
            <li key={plan.id}>
              <strong>{plan.name}</strong>
              <br />
              <span>{plan.price}</span>
              <br />
              <button type="button" onClick={() => handleSelectPlan(plan)}>
                Escolher
              </button>
            </li>
            <br />
            <br />
          </>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const plans = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      price: price.unit_amount ?  price.unit_amount / 100 : 0,
    }
  })

  return {
    props: {
      plans
    }
  }
}
