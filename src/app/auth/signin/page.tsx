"use client";

import { authUser, getTokens } from "@/services/auth/authApi";
import styles from "./signin.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { setAccessToken, setRefreshToken, setUsername } from "@/store/features/authSlice";

export default function Signin() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      return setErrorMessage("Заполните все поля");
    }

    setIsLoading(true);

    authUser({ email, password })
    .then((res) => {
      dispatch(setUsername(res.data.username));
      return getTokens({ email, password });
    })
      .then((res) => {
        dispatch(setAccessToken(res.access));
        dispatch(setRefreshToken(res.refresh))
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
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={"/auth/signup"} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
