import Head from "next/head";

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { Button, Input } from "../../components/shared/form";

import styles from '../../styles/pages/SignIn.module.css'
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter()

  function handleCreateAccount() {
    router.push('/checkout')
  }

  return (
    <>
      <Head>
        <title>Crie sua conta - Phenix</title>
      </Head>

      <main className={styles['sign-in-container']}>
      <div className={styles['box-container']}>
        <a href="/">
          <svg
            width="47"
            height="30"
            viewBox="0 0 47 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.8443 9.40395L0.493828 0.86525L0 0.625061V6.82793L11.543 12.5084L17.8443 9.40395ZM46.9999 29.9583V23.7554L35.4981 18.099L29.202 21.2034L46.9999 29.9583ZM46.5114 0.865125L47.0001 0.630942V6.83381L29.8194 15.3005L23.5232 18.4049L0 30V23.7911L17.2219 15.3065L23.518 12.196H23.5232L46.5114 0.865125Z"
              fill="#DC1637"
            />
          </svg>
        </a>

        <form className={styles.form}>
          <h1>Primeiro vamos criar sua conta!</h1>
          <p>
            Já tem uma conta aqui?{' '}
            <a href="/auth/sign-in" className={styles['info-link']}>
              Faça login
            </a>
          </p>
          <div className={styles['form-container']}>
            <div>
              <Input
                label="Nome *"
                id="text"
              />
            </div>

            <div className="mt-6">
              <Input
                label="E-mail *"
                id="email"
              />
            </div>

            <div className="mt-6">
              <Input
                label="Nome da sua empresa *"
                id="text"
              />
            </div>

            <div className="mt-6">
              <Input
                label="CNPJ *"
                id="number"
              />
            </div>

            <div className="mt-6">
              <Input
                label="Senha *"
                id="password"
                type="password"
              />
            </div>

            <div className={styles['button-container']}>
              <Button
                type="submit"
                onClick={handleCreateAccount}
              >
                Prosseguir
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
    </>
  )
}
