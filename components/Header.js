import classNames from "classnames";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Header() {
  const session = useSession();

  function Title() {
    return (
      <Link href="/">
        <h1 className="text-center text-3xl hover:text-purple-100 semibold">
          vault
        </h1>
      </Link>
    );
  }

  return (
    <div
      className={classNames(
        "absolute top-5 flex flex-row justify-center items-center px-12 py-3 text-white md:mx-8 w-fit bg-purple-900 py-4 shadow-xl"
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
