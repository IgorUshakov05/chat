import { observer } from "mobx-react-lite";
import authStore from "../../store/authDataUser";
import { useState } from "react";
import Link from "next/link";
const Form = observer(() => {
  let [isActivePassword, setActivePassword] = useState(false);
  let [isActiveLogin, setActiveLogin] = useState(false);
  async function registrationUser() {
    try {
      console.log(authStore.login, authStore.password);
      authStore.setError("");
      setActiveLogin(false);
      setActivePassword(false);
      // localStorage.setItem('access', )
      // let userFromServer = sendAuthRequest();
      // console.log(userFromServer);
    } catch (e) {
      console.error(e);
      authStore.setError("Ошибка при отправке!");
    }
  }
  function LoginChange(e: React.FormEvent<HTMLInputElement>) {
    const loginValue = e.currentTarget.value.trim();
    const regex = /^.{4,25}$/;
    authStore.setLogin(loginValue.replace(/[^a-zA-Z0-9]/g, ""));
    if (regex.test(loginValue)) {
      console.log("Логин удовлетворяет требованиям");
      return setActiveLogin(false);
    }
    console.log("Логин не удовлетворяет требованиям");
    return setActiveLogin(true);
  }

  function PasswordChange(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    const regex = /^.{4,100}$/;
    authStore.setPassword(value);
    if (regex.test(value)) {
      console.log("Строка длиннее или равна 4 символам");
      setActivePassword(false);
    } else {
      console.log("Строка слишком короткая");
      setActivePassword(true);
    }
  }

  return (
    <div className="space-y-6">
      {!!authStore.error && (
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span className="block sm:inline">{authStore.error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Логин
        </label>
        <div className="mt-2">
          <input
            id="text"
            onInput={LoginChange}
            name="text"
            type="text"
            value={authStore.login}
            required
            autoComplete="login"
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
              isActiveLogin
                ? "border-2 border-red-500 focus:border-red-700"
                : ""
            }`}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Пароль: {isActivePassword ? "True" : "False"}
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            onInput={PasswordChange}
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
              isActivePassword
                ? "border-2 border-red-500 focus:border-red-700"
                : ""
            }`}
          />
        </div>
      </div>

      <div>
        <button
          disabled={isActivePassword || isActiveLogin}
          onClick={registrationUser}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Создать
        </button>
        <Link
          href={"/invite"}
          style={{ marginTop: "10px" }}
          type="submit"
          className="text-balck flex w-full cursor-pointer justify-center rounded-md border border-black bg-white px-3 py-1.5 text-sm/6 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Присоединиться к чату
        </Link>
      </div>
    </div>
  );
});

export default Form;
