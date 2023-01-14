import { Reducer, useEffect, useReducer, useState } from "react";
import { Clock, Spinner } from "phosphor-react";
import moment from "moment-timezone";

import Head from "next/head";

import {
  Action,
  ActionTypes,
  initialState,
  State,
  timeReducer,
} from "../reducers/times";
import { ClockInCard } from "../components/pages/app/times";
import {
  Dialog,
  DialogActions,
  DialogPanel,
  DialogTitle,
} from "../components/shared/overlay/modal";

import styles from "../styles/pages/App.module.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer<Reducer<State, Action<string>>>(
    timeReducer,
    initialState
  );

  const [realTime, setRealTime] = useState() as any;

  function handleClockIn() {
    dispatch({ type: ActionTypes.CLOCK_IN });
    dispatch({ type: ActionTypes.STOP_CLOCK_IN });
  }

  function getTimeInSaoPaulo() {
    const time = moment().tz("America/Sao_Paulo").format("HH:mm:ss");
    return time;
  }

  useEffect(() => {
    setInterval(() => {
      const time = getTimeInSaoPaulo();
      setRealTime(time);
    }, 1000);
  }, []);

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
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-4 py-3 bg-sky-500 text-white font-regular uppercase rounded text-sm flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
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
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DialogPanel>
            <DialogTitle>Cadastrar ponto</DialogTitle>
            <div className="flex flex-col w-full my-6">
              <span className="text-center text-6xl">{realTime}</span>
            </div>

            {state.clickedTime.length > 0 && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-green-700 border border-green-300 rounded-lg bg-green-50"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium text-lg">
                    {state.clickedTime}
                    <br />
                  </span>{" "}
                  Ponto batido com sucesso! Você já pode fechar este modal.
                </div>
              </div>
            )}

            <DialogActions>
              <button
                type="button"
                className="w-full p-4 rounded-full bg-transparent border border-gray-200 text-stone-900 font¨-regular"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="w-full p-4 rounded-full bg-black text-white font-regular flex items-center justify-center disabled:opacity-60"
                disabled={state.isClockingIn || state.clickedTime.length > 0}
                onClick={handleClockIn}
              >
                {state.isClockingIn ? (
                  <Spinner className="text-gray-500 animate-spin" size={24} />
                ) : (
                  "Bater ponto"
                )}
              </button>
            </DialogActions>
          </DialogPanel>
        </Dialog>
      </main>
    </>
  );
}
