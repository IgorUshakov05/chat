import MessageItem from "./message";
import chatStore from "@/../store/currentChat";
import authStore from "../../store/authDataUser";
import { observer } from "mobx-react-lite";
const ChatBlock = observer(() => {
  return (
    <div className="flex-1 overflow-auto p-4">
      {chatStore.messages.map((message, index) => (
        <MessageItem
          key={index}
          sender={message.user || 'Аноним'}
          text={message.message}
          id={message.id === authStore.myID}
        />
      ))}
    </div>
  );
});

export default ChatBlock;
