"use client";
import ParentUserList from "../../components/ParentUserList";
import React from "react";
import ChatBlock from "../../components/chatBlock";
import { v4 as uuidv4 } from "uuid";
import { WebSocketProvider } from "@/components/WebSocketChat";
import authStore from "../../../store/authDataUser";
import InputMessage from "../../components/inputMessage";
import { useEffect, createContext } from "react";
function Room() {
  useEffect(() => {
    let myID = localStorage.getItem("myID");

    if (!myID) {
      let newID = uuidv4().toString();
      localStorage.setItem("myID", newID);
      authStore.setMyId(newID);
    } else {
      authStore.setMyId(myID); // Используем существующий ID
    }
  }, []);

  return (
    <WebSocketProvider>
      <div className="flex h-screen overflow-hidden">
        <ParentUserList />
        <div className="flex h-screen w-full flex-col">
          <ChatBlock />
          <InputMessage />
        </div>
      </div>
    </WebSocketProvider>
  );
}

export default Room;
