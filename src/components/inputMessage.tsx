import React, { useContext, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { WebSocketContext } from "@/components/WebSocketChat";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authDataUser";
import secretStore from "../../store/secretData";
import chat from "../../store/currentChat";

const InputMessage = observer(() => {
  const context = useContext(WebSocketContext);

  if (!context) {
    return <div>Ошибка: WebSocketContext не найден.</div>;
  }

  const { socket, sendMessage } = context;
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      sendMessage(
        message,
        authStore.myID,
        secretStore.uuidRoom,
        authStore.login,
      );
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-4">
      {chat.messages.length}
      <div className="flex items-center justify-between rounded border border-gray-200 bg-gray-100">
        <input
          type="text"
          placeholder="Сообщение"
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
          className="w-full bg-transparent px-4 py-1 text-gray-600 focus:outline-none"
        />{" "}
        <button
          disabled={message.trim() === ""}
          onClick={handleSendMessage}
          className="inline-flex items-center rounded-r border-l border-gray-200 bg-white px-4 py-2 text-gray-600 hover:bg-gray-50 focus:outline-none active:bg-gray-200 disabled:opacity-50"
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
});

export default InputMessage;
