import { observer } from "mobx-react-lite";
import authStore from "../../store/authDataUser";
import secretStore from "../../store/secretData";
import { useState } from "react";
import Link from "next/link";
import registerUser from "../hooks/auth";
const Form = observer(() => {
  let [isActivePassword, setActivePassword] = useState(false);
  let [isLoad, setLoad] = useState(false);
  let [isActiveLogin, setActiveLogin] = useState(false);
  async function registrationUser() {
    try {
      if (!authStore.login || !authStore.password) return false;
      setLoad(true);
      console.log(authStore.login, authStore.password);
      authStore.setError("");
      alert(`${authStore.login} ${authStore.myID}`);
      let generateUUID = await registerUser();
      if (!generateUUID.success) {
        authStore.setError("Ошибка при создании чата");
        setActiveLogin(true);
        setActivePassword(true);
        authStore.setLogin("");
        authStore.setPassword("");
      }

      setLoad(false);
      if (generateUUID.id) {
        secretStore.setPassword(authStore.password);
        secretStore.setUuidRoom(generateUUID.id);
        console.log(generateUUID);
      }
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
            Пароль чата
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
          disabled={isActivePassword || isActiveLogin || isLoad}
          onClick={registrationUser}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoad ? (
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Создать"
          )}
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
