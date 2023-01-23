import { GetServerSideProps } from "next";
import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import Head from "next/head";
import { useRouter } from "next/router";

import { stripe } from "../../lib/stripe";
import { firestore } from "../../lib/firebase";
import { Button, Input } from "../../components/shared/form";
import { StepItem, Steps } from "../../components/shared/navigation/steps";

import styles from "../../styles/pages/Success.module.css";

interface Props {
  billingDetails: any;
}

const INITIAL_STEP = 1;

export default function CheckoutSuccess({ billingDetails }: Props) {
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP);
  const [isSubmitingData, setIsSubmitingData] = useState(false);

  const [userInputValue, setUserInputValue] = useState({
    name: "",
    phone: "",
    registryCode: "",
  });

  const [companyInputValue, setCompanyInputValue] = useState({
    companyName: "",
    companyPhone: "",
    companyRegistryCode: "",
  });

  const router = useRouter();

  function handleGoToNextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function handleGoToPreviousStep() {
    setCurrentStep((prev) => prev - 1);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let previousButton = document.querySelector("#previousButton");
    let submitDivision = document.getElementById("submitDivision");

    previousButton?.classList.add(styles["widthAnimation"]);

    setTimeout(async () => {
      submitDivision!.style.gap = "0px";

      if (currentStep === 2) {
        console.log("user data");

        const { name, phone, registryCode } = userInputValue;
        const { companyName, companyPhone, companyRegistryCode } =
          companyInputValue;

        const data = {
          name,
          email: billingDetails.customerData.email,
          phoneNumber: phone,
          registryCode,
          company: {
            name: companyName,
            phoneNumber: companyPhone,
            registryCode: companyRegistryCode,
          },
        };

        try {
          setIsSubmitingData(true);

          if (Object.values(userInputValue).some((value) => value === "")) {
            console.log("there are empty fields");
            return;
          }

          if (Object.values(companyInputValue).some((value) => value === "")) {
            console.log("there are empty fields");
            return;
          }

          const userQuery = query(
            collection(firestore, "phenix-users"),
            where("registryCode", "==", data.registryCode)
          );
          const userAlreadyExists = await getDocs(userQuery);

          if (userAlreadyExists.size) {
            console.log("user already exists in db");
            return;
          }

          await addDoc(collection(firestore, "phenix-users"), data);
          router.push("/app");
        } catch (err) {
          console.log("err", err);
        } finally {
          setIsSubmitingData(false);
        }
      }
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
    <>
      <Head>
        <title>Setup da conta - Phenix Pontos</title>
      </Head>

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

              <form
                className="mx-auto w-full max-w-2xl flex-col"
                onSubmit={handleSubmit}
              >
                <div className="w-full mt-16">
                  <div id="formGroup" className={styles["form-group"]}>
                    {/* USER DATA FORM */}
                    <div id="userDataForm" className="block">
                      <div className="w-full flex items-start gap-8 mt-16">
                        <Input
                          type="text"
                          label="Nome"
                          id="name"
                          value={userInputValue.name}
                          onChange={(event) =>
                            setUserInputValue({
                              ...userInputValue,
                              name: event.target.value,
                            })
                          }
                        />
                        <Input
                          type="email"
                          label="E-mail"
                          id="email"
                          value={billingDetails.customerData.email}
                          disabled
                        />
                      </div>
                      <div className="w-full flex items-start gap-8 mt-8">
                        <Input
                          type="text"
                          label="Telefone de contato"
                          id="phoneNumber"
                          value={userInputValue.phone}
                          onChange={(event) =>
                            setUserInputValue({
                              ...userInputValue,
                              phone: event.target.value,
                            })
                          }
                        />
                        <Input
                          type="text"
                          label="CPF"
                          id="registryCode"
                          value={userInputValue.registryCode}
                          onChange={(event) =>
                            setUserInputValue({
                              ...userInputValue,
                              registryCode: event.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* COMPANY DATA FORM */}
                    <div id="companyDataForm" className="hidden opacity-0">
                      <div className="w-full flex items-start gap-8 mt-16">
                        <Input
                          type="text"
                          label="Nome da empresa"
                          id="companyName"
                          value={companyInputValue.companyName}
                          onChange={(event) =>
                            setCompanyInputValue({
                              ...companyInputValue,
                              companyName: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-full flex items-start gap-8 mt-8">
                        <Input
                          type="text"
                          label="Telefone de contato"
                          id="companyPhone"
                          value={companyInputValue.companyPhone}
                          onChange={(event) =>
                            setCompanyInputValue({
                              ...companyInputValue,
                              companyPhone: event.target.value,
                            })
                          }
                        />
                        <Input
                          type="text"
                          label="CNPJ"
                          id="companyRegistryCode"
                          value={companyInputValue.companyRegistryCode}
                          onChange={(event) =>
                            setCompanyInputValue({
                              ...companyInputValue,
                              companyRegistryCode: event.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* FIM DO COMPANY DATA FORM */}
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  if (!query.session_id)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const sessionId = String(query.session_id);

  try {
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
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
