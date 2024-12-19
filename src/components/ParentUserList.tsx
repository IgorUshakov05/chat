import UserItem from "./userItemInList";
import chatStore from "@/../store/currentChat";
import { observer } from "mobx-react-lite";
const ParentUserList = observer(() => {
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
