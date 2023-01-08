import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { supabase } from "../../utils/supabaseClient";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function New() {
  const session = useSession();
  const router = useRouter();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  // useEffect(() => {
  //   if (!session?.user) {
  //     router.push("/");
  //   }
  // }, [router, session?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      console.log("missing field");
      return;
    }

    const { data, error } = await supabase
      .from("secrets")
      .insert([{ title, content }]) //user_id: session.user.uuid
      .select();

    if (error) {
      console.log(error);
    }

    // row good!
    if (data) {
      // console.log(data);
      router.push("/secrets");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="title">new secret</h1>
      <div className="md:my-9 mt-9 space-y-3 w-full">
        <div>
          <p>title</p>
          <input
            type="text"
            className="text-input"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <p>confession</p>
          <textarea
            className="text-input h-[200px]"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="flex md:flex-row md:space-y-0 flex-col-reverse text-center w-full md:justify-between">
        <Link href="/secrets">
          <p className="button bg-yellow-200 text-yellow-800 hover:bg-yellow-500 border-yellow-500 ">
            cancel
          </p>
        </Link>
        <button
          className="button bg-purple-200 text-purple-800 hover:bg-purple-500 border-purple-500 md:mb-0 mb-4"
          type="submit"
        >
          submit
        </button>
      </div>
    </form>
  );
}
