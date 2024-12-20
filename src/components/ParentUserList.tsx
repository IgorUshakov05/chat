import UserItem from "./userItemInList";
import chatStore from "@/../store/currentChat";
import authStore from "@/../store/authDataUser";
import chatData from "@/../store/secretData";
import { observer } from "mobx-react-lite";
import { WebSocketContext } from "@/components/WebSocketChat";
import { useContext, useEffect } from "react";
const ParentUserList = observer(() => {
  const context = useContext(WebSocketContext);
  if (!context) return <h1>Нет коннекта</h1>;
  const { socket, join } = context;
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      async function regInRoom() {
        let joinData = await join(authStore.myID, chatData.uuidRoom);
        console.log(joinData);
      }
      regInRoom();
    }
  }, []);
  return (
    <div className="hidden-scrollbar w-80 overflow-y-auto bg-white">
      <p className="pb-2 pl-4 pt-3 text-2xl font-bold text-indigo-600 dark:text-white">
        Участники чата
      </p>

      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {chatStore.users.map((item, index) => (
          <UserItem name={!!item ? item : "Аноним"} key={index} />
        ))}
      </ul>
    </div>
  );
});
export default ParentUserList;
