import Head from "next/head";
import { Clock } from "phosphor-react";

import { ClockInCard } from "../components/pages/app/times";

import styles from "../styles/pages/App.module.css";

export default function App() {
  return (
    <>
      <Head>
        <title>Meus Pontos - Phenix</title>
      </Head>

      <main className={styles["app-container"]}>
        <div className="bg-black w-full flex flex-col">
          <div className="w-full max-w-7xl mx-auto my-0 flex flex-col p-4 pb-12 mt-12">
            <div className="w-full flex items-center justify-between">
              <div>
                <h1 className="font-regular text-white text-3xl">
                  Boa tarde, <span className="font-semibold">Felipe</span>!
                </h1>
                <p className="text-base text-stone-400 font-light leading-tight mt-1">
                  Faltam X pontos para você completar o seu dia!
                </p>
              </div>
              <button className="px-4 py-3 bg-sky-500 text-white font-regular uppercase rounded text-sm flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Clock size={16} weight="bold" /> Marcar ponto
              </button>
            </div>
          </div>
        </div>
        <section className="w-full relative">
          <div className="w-full max-w-7xl mx-auto my-6 p-4">
            <span className="text-gray-500 font-light">
              Você possui 12 pontos completos e 3 inconcistências.{" "}
              <a href="/" className="underline">
                Clique aqui para ver
              </a>
            </span>
            <div className="w-full mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ClockInCard type="in-progress" />
              <ClockInCard type="done" />
              <ClockInCard type="inconsistent" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
