import { useRouter } from "next/router";
import type { GetStaticProps } from "next";

import { doc, getDoc } from "firebase/firestore";

import { firestore } from "../lib/firebase";
import { formatCurrency } from "../utils/format-currency";

interface Plan {
  name: string;
  price: number;
}

interface Props {
  plans: Plan[];
}

export default function Home({ plans }: Props) {
  const router = useRouter();

  function handleSelectPlan(plan: Plan) {
    localStorage.setItem("phenix:redirect", JSON.stringify(plan));
    router.push("/checkout");
  }

  return (
    <div>
      <h1>Planos</h1>
      <ul>
        {plans.map((plan, index) => (
          <>
            <li key={index}>
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

export const getStaticProps: GetStaticProps = async () => {
  const plansSnapshot = await getDoc(doc(firestore, "phenix-plans", "plans"));
  const { plans = [] } = plansSnapshot.data() || {};

  const plansWithFormatPrice = plans.map(({ name, price }: Plan) => ({
    name: `Plano ${name}`,
    price: formatCurrency(price) as string | number,
  }));

  return {
    props: {
      plans: plansWithFormatPrice,
    },
  };
};
