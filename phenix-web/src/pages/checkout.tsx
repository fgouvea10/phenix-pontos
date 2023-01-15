import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "../components/shared/form";

const checkoutFormSchema = z.object({
  email: z.string().email(),
});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const productInStorage =
    typeof window !== "undefined"
      ? window.localStorage.getItem("phenix:redirect")
      : null;
  const product = productInStorage ? JSON.parse(productInStorage) : null;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
  });

  async function handleProceedToPayment(data: CheckoutFormData) {
    console.log(data.email);
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
        onSubmit={handleSubmit(handleProceedToPayment)}
      >
        <h2>Checkout</h2>
        <p>Informe o email que será utilizado na compra</p>
        <Input label="E-mail" type="email" id="email" {...register("email")} />
        {errors?.email && (
          <p className="py-2 text-red-400">O e-mail é obrigatório</p>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Avançar para o pagamento
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
