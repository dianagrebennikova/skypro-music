"use client";

import styles from "./signup.module.css";
import classNames from "classnames";
import { useState } from "react";
import { AxiosError } from "axios";
import { RegUser } from "@/services/auth/regApi";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChengeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      return setErrorMessage("Заполните все поля");
    }

    setIsLoading(true);

    RegUser({ email, password, username })
      .then((res) => {
        localStorage.setItem("username", res.data.result.username);
        router.push("/music/main");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage("Отсутсвует подключение к интернету");
          } else {
            setErrorMessage("Неизвестная ошибка");
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className={styles.modal__logo}>
        <img src="/img/logo_modal.png" alt="logo" />
      </div>

      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="text"
        name="username"
        placeholder="Введите имя"
        onChange={onChengeUsername}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
