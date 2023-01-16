import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import nookies from "nookies";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

import { Button, Input } from "../components/shared/form";
import { useEffect, useState } from "react";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { GetStaticProps } from "next";
import axios from "axios";
import { Spinner } from "phosphor-react";

const checkoutFormSchema = z.object({
  email: z.string().email(),
});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

interface Product {
  id: string;
  name: string;
  price: string;
  defaultPriceId: any;
}

interface Props {
  product: Product;
}

export default function Checkout({ product }: Props) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
  });

  async function handleCheckoutFormSubmit(data: CheckoutFormData) {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      console.log("failed to redirect to checkout", err);
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <div className="w-full flex flex-col">
      <header className="bg-black text-gray-100 w-full font-light">
        <div className="w-full max-w-7xl mx-auto flex items-center px-4 py-8 justify-between">
          <a href="/">Phenix</a>
          <span>Ambiente 100% seguro</span>
        </div>
      </header>

      <form
        className="w-full mt-12 max-w-7xl mx-auto flex flex-col p-4"
        onSubmit={handleSubmit(handleCheckoutFormSubmit)}
      >
        <h2>Checkout</h2>
        <p>Informe o email que será utilizado na compra</p>
        <Input label="E-mail" type="email" id="email" {...register("email")} />
        {errors?.email && (
          <p className="py-2 text-red-400">O e-mail é obrigatório</p>
        )}
        <Button type="submit" disabled={isCreatingCheckoutSession}>
          {isCreatingCheckoutSession ? (
            <>
              <Spinner className="animate-spin duration-100" size={16} color="#fff" />{" "}
              Avançar para o pagamento
            </>
          ) : (
            "Avançar para o pagamento"
          )}
        </Button>
        <div className="w-full mt-8 flex flex-col">
          <div className="w-full border-t border-t-gray-200 p-4" />
          <strong>{product?.name}</strong>
          <span>{product?.price}</span>
          <div className="w-full border-b border-b-gray-200 p-4" />
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const productId = nookies.get(context)["phenix:redirect"];
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  })
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        defaultPriceId: price.id,
      },
    },
  };
}
