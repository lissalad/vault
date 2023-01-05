import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { supabase } from "../../utils/supabaseClient";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

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
    <>
      {secret ? (
        <div>
          <h1>{secret.title}</h1>
          <p>{secret.content}</p>
          <button onClick={handleDelete}>delete</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Secret;
