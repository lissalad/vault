import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRef } from "react";
import classNames from "classnames";
import SignOutButton from "../components/SignOutButton";
import Header from "../components/Header";
import VaultIcon from "../components/VaultIcon";
import Link from "next/link";

const LoginPage = () => {
  const supabase = useSupabaseClient();
  // const inputRef = useRef();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: "elissalaymon@gmail.com",
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
    console.log({ data, error });
  }

  return (
    <div
      className={classNames(
        "flex flex-col bg-rose-200 rounded-2xl px-10 py-8 w-fit items-center text-rose-900 shadow-xl mx-auto my-4"
      )}
    >
      <div
        className={classNames("mb-3 text-center flex flex-col items-center")}
      >
        <img src="/images/key.png" height="100" width="100" />
        <h1 className="text-5xl font-semibold mt-4">welcome to vault</h1>
        <h2 className="text-xl mt-2">your secrets are safe with me!</h2>
      </div>

      <div className={classNames("space-y-3 mt-7")}>
        <p>Enter your email and we will send you your login link.</p>
        <div className={classNames("flex flex-row w-full space-x-2")}>
          <input type="text" className="w-full rounded-lg px-3" />
          <button
            onClick={signInWithEmail}
            className="bg-yellow-200 text-yellow-800 px-10 py-2 rounded-lg whitespace-nowrap border border-yellow-500"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const session = useSession();

  return (
    <div className={classNames("")}>
      {!session ? (
        <LoginPage />
      ) : (
        <div>
          <Header />
          <main>
            {/* <VaultIcon /> */}
            <Link href="/secrets">open your vault</Link>
          </main>
        </div>
      )}
    </div>
  );
};

export default Home;
