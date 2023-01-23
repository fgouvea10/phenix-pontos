import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import nookies from "nookies";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

import { Button, Input } from "../../components/shared/form";
import { useEffect, useState } from "react";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
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
        priceId: product.defaultPriceId,
        email: data.email,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      console.log("failed to redirect to checkout", err);
    } finally {
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

      <main className="w-full flex flex-col">
        <div className="flex max-w-2xl mx-auto flex-col w-full px-4 py-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <section className="mt-10">
            <h2 className="sr-only">Resumo do pedido</h2>
            <div className="w-full flex flex-col gap-3">
              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-betweeen">
                    <dt className="text-base font-light text-gray-600">
                      Produto:
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      {product.name}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-betweeen">
                    <dt className="text-base font-light text-gray-600">
                      Total:
                    </dt>
                    <dd className="ml-4 text-base font-medium text-gray-900">
                      {product.price}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <form
              className="mt-10 w-full flex flex-col gap-4"
              onSubmit={handleSubmit(handleCheckoutFormSubmit)}
            >
              <div className="w-full flex flex-col gap-3">
                <small className="font-light text-stone-700">
                  Insira o seu e-mail para prosseguir
                </small>
                <Input
                  label="E-mail"
                  type="email"
                  id="email"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="py-2 text-red-400">O e-mail é obrigatório</p>
                )}
              </div>

              <Button type="submit" disabled={isCreatingCheckoutSession}>
                Prosseguir para o pagamento
              </Button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const productId = nookies.get(context)["phenix:redirect"];

  console.log("productiD", productId);

  if (productId == undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
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
