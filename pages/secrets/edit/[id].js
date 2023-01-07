import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";

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

  return (
    <div
      className={classNames(
        "flex flex-col bg-rose-200 rounded-2xl px-10 py-8 w-fit items-center text-rose-900 shadow-xl mx-auto my-4"
      )}
    >
      <form className="" onSubmit={handleSubmit}>
        <h1 className="text-3xl text-center font-semibold mt-4">edit secret</h1>
        <div className="my-9 space-y-3">
          <div>
            <p>title</p>
            <input
              type="text"
              className="w-full rounded-lg px-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <p>confession</p>
            <input
              type="textarea"
              className="w-full rounded-lg px-3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <button className="button">save</button>
      </form>
    </div>
  );
};
export default Edit;
