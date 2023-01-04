import { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { supabase } from "../../utils/supabaseClient";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function New() {
  const session = useSession();
  const router = useRouter();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(session["user"].email);

    if (!title || !content) {
      console.log("missing field");
      return;
    }

    const { data, error } = await supabase
      .from("secrets")
      .insert([{ title, content }])
      .select();

    if (error) {
      console.log(error);
    }

    // row good!
    if (data) {
      console.log(data);
      router.push("/secrets");
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col bg-rose-200 rounded-2xl px-10 py-8 w-fit items-center text-rose-900 shadow-xl mx-auto my-4"
      )}
    >
      <form onSubmit={handleSubmit}>
        <h1 className="text-5xl font-semibold mt-4">add confession</h1>
        <div className="my-9 space-y-3">
          <div>
            <p>title</p>
            <input
              type="text"
              className="w-full rounded-lg px-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <p>confession</p>
            <input
              type="textArea"
              className="w-full rounded-lg px-3"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <button className="bg-yellow-200 text-yellow-800 px-10 py-2 rounded-lg whitespace-nowrap border border-yellow-500">
          submit
        </button>
      </form>
    </div>
  );
}
