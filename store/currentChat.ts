import { makeObservable } from "mobx";

class Chat {
  users: string[] = ["Igor", "Anna", "Dmitry", "Elena"];
  messages: { user: string; message: string; id?: string }[] = [
    {
      user: "Igor",
      message: "Привет всем!",
      id: "320bb35a-2d96-4e3e-98d5-27dd7e9c0290",
    },
    {
      user: "Anna",
      message: "Привет, Игорь! Как дела?",
      id: "320bb35a-2d96-4e3e-awdawdawd 1e",
    },
    {
      user: "Dmitry",
      message: "Привет! Кто готов на проект?",
      id: "awwad awd awd awd awd2",
    },
    {
      user: "Elena",
      message: "Всем привет! Когда созвон?",
      id: "awdawdawd awd aw",
    },
    {
      user: "Igor",
      message: "Сегодня в 19:00, удобно?",
      id: "320bb35a-2d96-4e3e-98d5-27dd7e9c0290",
    },
  ];

  constructor() {
    makeObservable(this);
  }
  setNewUser(user: string) {
    if (!user) return;
    this.users.push(user);
  }

  removeUser(user: string) {
    this.users.filter((userItem) => userItem !== user);
  }

  addMessage(user: string, message: string, id: string) {
    console.log({ user, message, id });
    this.messages = [...this.messages, { user, id, message }];
    console.log(this.messages);
  }
}

const chat = new Chat();
export default chat;
