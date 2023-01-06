import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { supabase } from "../../utils/supabaseClient";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Pencil, Trash } from "../../components/Icons";

const Secret = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const { id } = router.query;
  const [secret, setSecret] = useState();

  async function fetchSecret(id) {
    const { data: secret, error } = await supabase
      .from("secrets")
      .select()
      .eq("id", id)
      .single();

    return { secret, error };
  }

  useEffect(() => {
    if (id) {
      fetchSecret(id).then(({ secret, error }) => {
        if (error) {
          // router.push("/");
          console.log(error);
        } else {
          setSecret(secret);
        }
      });
    }
  });

  async function handleDelete() {
    const { data, error } = await supabase
      .from("secrets")
      .delete()
      .match({ id: secret.id });
    router.push("/secrets");
  }

  return (
    <div className="flex justify-center">
      {secret ? (
        <div className="p-9 border-8 border-black w-[600px] rounded-sm relative">
          <div className="flex flex-row absolute top-3 right-3 space-x-3">
            <a
              href={"/secrets/edit/" + secret.id}
              className="p-3 hover:bg-yellow-300 rounded-2xl"
            >
              <Pencil />
            </a>
            <button
              className="p-3 hover:bg-red-300 rounded-2xl"
              onClick={handleDelete}
            >
              <Trash />
            </button>
          </div>
          <h1 className="text-6xl mb-9 pb-5 border-b-4 border-black text-center">
            {secret.title}
          </h1>

          <p className="text-lg text-left indent-5">{secret.content}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Secret;
