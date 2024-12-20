"use client";
import ParentUserList from "../../components/ParentUserList";
import React from "react";
import ChatBlock from "../../components/chatBlock";
import { v4 as uuidv4 } from "uuid";
import { WebSocketProvider } from "@/components/WebSocketChat";
import authStore from "../../../store/authDataUser";
import InputMessage from "../../components/inputMessage";
import { useEffect } from "react";
import secretStore from "../../../store/secretData";
function Room() {
  useEffect(() => {
    let myID = localStorage.getItem("myID");
    let login = localStorage.getItem("login");
    let loginOfStore = authStore.login;
    if (loginOfStore) {
      localStorage.setItem("login", loginOfStore);
    }
    if (!loginOfStore && login) {
      authStore.setLogin(login);
    }
    if (!myID) {
      const newID = uuidv4();
      localStorage.setItem("myID", newID);
      authStore.setMyId(newID);
    } else {
      authStore.setMyId(myID);
    }

    const chatID = localStorage.getItem("chatID");
    if (!chatID) {
      localStorage.setItem("chatID", secretStore.uuidRoom);
    } else {
      secretStore.setUuidRoom(chatID);
    }
    
  }, [authStore, secretStore]);

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
