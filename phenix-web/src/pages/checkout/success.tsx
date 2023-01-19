import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Button, Input } from "../../components/shared/form";
import { StepItem, Steps } from "../../components/shared/navigation/steps";
import { stripe } from "../../lib/stripe";

import styles from "../../styles/pages/Success.module.css";
interface Props {
  billingDetails: any;
}

const INITIAL_STEP = 1;

function UserDataForm({ data }: any) {
  return (
    <div id="userDataForm" className="block">
      <div className="w-full flex items-start gap-8 mt-16">
        <Input type="text" label="Nome" id="name" />
        <Input type="email" label="E-mail" id="email" value={data} disabled />
      </div>
      <div className="w-full flex items-start gap-8 mt-8">
        <Input type="text" label="Telefone de contato" id="phoneNumber" />
        <Input type="text" label="CPF" id="registryCode" />
      </div>
    </div>
  );
}

function CompanyDataForm() {
  return (
    <div id="companyDataForm" className="hidden opacity-0">
      <div className="w-full flex items-start gap-8 mt-16">
        <Input type="text" label="Nome da empresa" id="companyName" />
        <Input type="text" label="CNPJ" id="cnpj" />
      </div>
      <div className="w-full flex items-start gap-8 mt-8">
        <Input type="text" label="Telefone de contato" id="phoneNumber" />
        <Input type="text" label="CPF" id="registryCode" />
      </div>
    </div>
  );
}

export default function CheckoutSuccess({ billingDetails }: Props) {
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP);
  const [isSubmitingData, setIsSubmitingData] = useState(false);
  const [change, setChange] = useState(false);

  console.log("billing details", billingDetails);

  function handleGoToNextStep() {
    setCurrentStep((prev) => prev + 1);
    setChange(true);
  }

  function handleGoToPreviousStep() {
    setCurrentStep((prev) => prev - 1);
  }

  function handleSubmit() {
    setIsSubmitingData(true);

    let previousButton = document.querySelector("#previousButton");
    let submitDivision = document.getElementById("submitDivision");

    previousButton?.classList.add(styles["widthAnimation"]);

    setTimeout(() => {
      submitDivision!.style.gap = "0px";
    }, 600);
  }

  useEffect(() => {
    let userDataForm = document.querySelector("#userDataForm");
    let companyDataForm = document.querySelector("#companyDataForm");

    let nextButton = document.querySelector("#nextButton");

    nextButton?.addEventListener("click", () => {
      userDataForm?.classList.add(styles["activeOut"]);
      companyDataForm?.classList.remove("hidden");

      setTimeout(() => {
        companyDataForm?.classList.add(styles["activeIn"]);
      }, 400);
      
    });
  }, []);

  return (
    <div className="w-full flex flex-col">
      <header className="bg-black text-gray-100 w-full font-light">
        <div className="w-full max-w-7xl mx-auto flex items-center px-4 py-8 justify-between">
          <a href="/">Phenix</a>
          <span>Ambiente 100% seguro</span>
        </div>
      </header>

      <main className="flex flex-col w-full">
        <div className="flex max-w-7xl mx-auto flex-col w-full px-4 py-8">
          <div className="mt-6 w-full flex flex-col">
            <div className="mx-auto w-full max-w-2xl">
              <h2 className="font-regular text-stone-800 text-lg">
                Parabéns pela sua compra!
              </h2>
              <p className="font-light text-gray-400 mb-8">
                Agora precisamos configurar a sua conta antes de seguir para a
                plataforma.
              </p>

              <Steps>
                <StepItem step={1} isActive={currentStep === 1}>
                  Dados pessoais
                </StepItem>
                <StepItem step={2} isActive={currentStep === 2}>
                  Dados do admin
                </StepItem>
              </Steps>
            </div>

            <form className="mx-auto w-full max-w-2xl flex-col">
              <div className="w-full mt-16">
                <div id="formGroup" className={styles["form-group"]}>
                  <UserDataForm data={billingDetails.customerData.email} />
                  <CompanyDataForm />
                </div>
                <div
                  className="w-full mt-8 flex gap-4 transition-all duration-200"
                  id="submitDivision"
                >
                  <div
                    className={`${
                      currentStep === 1 ? "hidden" : "flex"
                    } overflow-hidden w-full`}
                    id="previousButton"
                  >
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={handleGoToPreviousStep}
                    >
                      Anterior
                    </Button>
                  </div>
                  <Button
                    type="button"
                    id="nextButton"
                    onClick={
                      currentStep === 2 ? handleSubmit : handleGoToNextStep
                    }
                    disabled={isSubmitingData}
                  >
                    {currentStep === 1
                      ? "Avançar"
                      : isSubmitingData
                      ? "Enviando seus dados..."
                      : "Concluir"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerData = session.customer_details;
  const product = session?.line_items?.data[0];

  return {
    props: {
      billingDetails: {
        customerData,
        product,
      },
    },
  };
};
