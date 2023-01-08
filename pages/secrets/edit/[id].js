import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import Link from "next/link";

const Edit = () => {
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [secret, setSecret] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function fetchSecret(id) {
    const { data: secret, error } = await supabase
      .from("secrets")
      .select()
      .eq("id", id)
      .single();

    return { secret, error };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      console.log("missing field");
      return;
    }

    const { data, error } = await supabase
      .from("secrets")
      .update([{ title, content }])
      .eq("id", id)

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

  useEffect(() => {
    if (id) {
      fetchSecret(id).then(({ secret, error }) => {
        if (error) {
          router.push("/");
        } else {
          setSecret(secret);
          setTitle(secret.title);
          setContent(secret.content);
        }
      });
    }
  }, [id, router]);

  // useEffect(() => {
  //   if (!session?.user) {
  //     router.push("/");
  //   }
  // }, [router, session?.user]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="title">edit secret</h1>
      <div className="md:my-9 mt-9 space-y-3 w-full">
        <div>
          <p>title</p>
          <input
            type="text"
            className="text-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <p>confession</p>
          <textarea
            className="text-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="flex md:flex-row md:space-y-0 flex-col-reverse text-center w-full md:justify-between">
        <Link href="/secrets">
          <p className="button bg-yellow-200 text-yellow-800 hover:bg-yellow-500 border-yellow-500 md:mb-0 mb-4">
            cancel
          </p>
        </Link>
        <button
          className="button bg-purple-200 text-purple-800 hover:bg-purple-500 border-purple-500"
          type="submit"
        >
          save
        </button>
      </div>
    </form>
  );
};
export default Edit;
