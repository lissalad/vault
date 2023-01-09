import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRef, useState } from "react";
import classNames from "classnames";
import SignOutButton from "../components/SignOutButton";
import Header from "../components/Header";
import VaultIcon from "../components/VaultIcon";
import Link from "next/link";

const LoginPage = () => {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState("");

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });

    if (error) {
      console.log(error);
    } else {
      setSubmitted(true);
    }
  }

  // check email page
  if (submitted) {
    return (
      <div className="form">
        <img
          className="-m-9 -mt-16 bouncing-envelope"
          src="/images/email.png"
          width="200"
        />
        <p className="title mt-8">check your email</p>
      </div>
    );
  }

  // login form
  return (
    <div className={classNames("form", "")}>
      {/* title and key */}
      <div
        className={classNames(
          "mb-3 mb-12 text-center flex flex-col items-center"
        )}
      >
        <img
          className="mb-3 w-32 rotating-key"
          src="/images/key.png"
          height="100"
          width="200"
        />
        <h1 className="text-5xl font-semibold mt-4 mb-3 whitespace-nowrap ">
          welcome to vault
        </h1>
        <h2 className="text-xl mt-2">lock away your secrets for safekeeping</h2>
      </div>

      {/* enter email */}
      <div className={classNames("space-y-2 items-center w-full")}>
        <p className="text-lg text-center">enter your email</p>
        <div
          className={classNames(
            "flex flex-col w-full items-center space-y-4",
            "md:flex-row"
          )}
        >
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="text-input"
          />
        </div>
      </div>

      {/* button */}
      <button
        onClick={signInWithEmail}
        className="button bg-purple-200 text-purple-800 hover:bg-purple-500 border-purple-500"
      >
        join
      </button>
    </div>
  );
};

const Home = () => {
  const session = useSession();

  // home vault page
  return (
    <div className={classNames("")}>
      {!session ? (
        <LoginPage />
      ) : (
        <div>
          <div className="flex flex-col-reverse md:flex-col items-center">
            <h1 className="title md:whitespace-nowrap  mt-12 md:mt-0">
              open the vault
              <br />
              to access your secrets
            </h1>

            <Link href="/secrets">
              {/* <div className="bg-stone-400 p-9 border-8 shadow-xl border-stone-800"> */}
              {/* <div className="bg-stone-500 border-8 border-stone-800 rounded-full p-7 shadow-xl"> */}
              {/* <img src="/images/vault-wheel.png" width="100" /> */}
              {/* </div> */}
              {/* </div> */}
              <VaultIcon />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
