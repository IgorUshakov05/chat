import React from "react";

export default function MessageItem({
  text,
  sender = "Аноним",
  id,
}: {
  text: string;
  sender: string;
  id: boolean;
}) {
  return (
    <div
      className={`mt-3 flex ${id ? "justify-end" : "justify-start"} gap-2.5`}
    >
      {!id && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-center text-white">
          {sender[0].toUpperCase()}
        </div>
      )}
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {sender}
          </span>
        </div>
        <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
          {text}
        </p>
      </div>
      {id && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-center text-white">
          {sender[0].toUpperCase()}
        </div>
      )}
    </div>
  );
}
