import React, { createContext, useState, useEffect, ReactNode } from "react";
import currentRoom from "@/../store/currentChat";
// Типизация для WebSocket контекста
interface WebSocketContextType {
  socket: WebSocket | null;
  sendMessage: (
    userID: string,
    chatID: string,
    login: string,
    message: string,
  ) => void;

  join: (userID: string, chatID: string) => {success: boolean };
}
interface MessageFromServer {
  userID: string;
  chanel: string;
  chatID?: string;
  login?: string;
  message?: string;
}
export const WebSocketContext = createContext<WebSocketContextType | null>(
  null,
);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:4000`);

    newSocket.onopen = () => {
      console.log("Соединение с WebSocket установлено");
    };

    newSocket.onmessage = (event) => {
      try {
        let serverMessage = event.data;
        console.log(serverMessage);
        let { message, userID, login, chanel }: MessageFromServer =
          JSON.parse(serverMessage);
        console.log("Сообщение от сервера:", {
          message,
          userID,
          login,
          chanel,
        });
        if (chanel === "/message") {
          if (login && message && userID) {
            currentRoom.addMessage(login, message, userID);
          }
        }
      } catch (e) {
        return;
      }
    };

    newSocket.onclose = () => {
      console.log("Соединение с WebSocket закрыто");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);
  const join = (userID: string, chatID: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const data = JSON.stringify({ userID, chatID, chanel: "/join-chat" });
      socket.send(data);
    }
  };
  const sendMessage = (
    message: string,
    userID: String,
    chatID: string,
    login: string,
  ) => {
    // if (!message || !chatID || !userID) return;
    if (socket && socket.readyState === WebSocket.OPEN) {
      const data = JSON.stringify({
        message,
        userID,
        chatID,
        login,
        chanel: "/message",
      });
      socket.send(data);
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, sendMessage, join }}>
      {children}
    </WebSocketContext.Provider>
  );
};
