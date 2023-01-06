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
      <div className="box">
        <img src="/images/email.png" width="130" />
        <p className="text-2xl px-9">check your email</p>
      </div>
    );
  }

  // login form
  return (
    <div className={classNames("box", "")}>
      {/* title and key */}
      <div
        className={classNames("mb-3 text-center flex flex-col items-center")}
      >
        <img src="/images/key.png" height="100" width="100" />
        <h1 className="text-4xl font-semibold mt-4">welcome to vault</h1>
        {/* <h2 className="text-xl mt-2">your secrets are safe with me!</h2> */}
      </div>

      {/* enter email */}
      <div className={classNames("space-y-3 items-center")}>
        <p className="text-xl text-center">enter your email</p>
        <div
          className={classNames(
            "flex flex-col w-full items-center space-y-4",
            "md:flex-row"
          )}
        >
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="text-input"
          />
        </div>
      </div>

      {/* button */}
      <button onClick={signInWithEmail} className="button">
        join
      </button>
    </div>
  );
};

const Home = () => {
  const session = useSession();

  // home page
  return (
    <div className={classNames("")}>
      {!session ? (
        <LoginPage />
      ) : (
        <div>
          <main>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl">
                open the vault to access your secrets
              </h1>

              <Link href="/secrets">
                <VaultIcon />
              </Link>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Home;
