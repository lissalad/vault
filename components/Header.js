import classNames from "classnames";
import SignOutButton from "./SignOutButton";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Header() {
  const session = useSession();

  function Title() {
    return <h1 className="text-3xl py-2 text-center">vault</h1>;
  }

  return (
    <div
      className={classNames(
        "flex flex-row bg-blue-100 w-full border-8 border-blue-300 border-t-0 items-center justify-between px-6 py-3 text-sky-700 mx-8 rounded-b-xl"
      )}
    >
      {session ? (
        <div
          className={classNames(
            "flex flex-row justify-between items-center w-full"
          )}
        >
          <Title />
          <SignOutButton />
        </div>
      ) : (
        <> {<Title />}</>
      )}
    </div>
  );
}
