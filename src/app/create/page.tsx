"use client";
import Form from "@/components/form";
import { observer } from "mobx-react-lite";
import ShareLink from "@/components/shareLink";
import secretStore from "../../../store/secretData";
const Registration = observer(() => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"></h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {secretStore.uuidRoom ? <ShareLink /> : <Form />}
        </div>
      </div>
    </>
  );
})


export default Registration