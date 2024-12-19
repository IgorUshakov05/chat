import secretStore from "../../store/secretData";
import { useState } from "react";
import Link from "next/link";
export default function ShareLink() {
  function copyURL() {
    navigator.clipboard
      .writeText(`${process.env.client}/room?id=${secretStore.uuidRoom}`)
      .then(
        () => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Сброс сообщения после 2 секунд
        },
        (err) => {
          console.error("Ошибка копирования: ", err);
        },
      );
  }
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div>
      <button
        onClick={copyURL}
        className={`group relative mb-2 me-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 ${
          isCopied
            ? "bg-green-500 text-white group-hover:bg-green-600"
            : "bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500"
        }`}
      >
        <span
          className={`relative w-full rounded-md px-5 py-2.5 transition-all duration-75 ease-in ${
            isCopied
              ? "bg-green-500"
              : "bg-white group-hover:bg-opacity-0 dark:bg-gray-900"
          }`}
        >
          {isCopied ? "Скопировано!" : "Скопировать ссылку на чат"}
        </span>
      </button>
      <Link
        href={`${process.env.client}/room?id=${secretStore.uuidRoom}`}
        style={{ marginTop: "10px" }}
        type="submit"
        className="text-balck flex w-full cursor-pointer justify-center rounded-md border border-black bg-white px-3 py-1.5 text-sm/6 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Присоединиться к чату
      </Link>
    </div>
  );
}
