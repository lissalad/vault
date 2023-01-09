import classNames from "classnames";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Header() {
  const session = useSession();

  function Title() {
    return (
      <Link href="/">
        <h1 className="text-center text-3xl hover:text-stone-300 semibold">
          vault
        </h1>
      </Link>
    );
  }

  return (
    <div
      className={classNames(
        "absolute top-0 flex flex-row justify-center items-center py-3 text-black w-full py-4 md:px-20 border-b bg-stone-50/20 border-stone-300/30"
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
