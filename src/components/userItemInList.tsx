export default function UserItem({ name = "Аноним" }: { name: string }) {
  return (
    <li className="pb-3 pl-3 pt-3">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-center text-white">
            {name[0]}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
        </div>
      </div>
    </li>
  );
}
