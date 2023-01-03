import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRef } from "react";

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
    <div>
      <p>enter email</p>
      <input />
      <button onClick={signInWithEmail}>login</button>
    </div>
  );
};

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? <LoginPage /> : <button onClick={signOut}>sign out</button>}
    </div>
  );
};

export default Home;
