import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import classNames from "classnames";

export default function Secrets() {
  const [secrets, setSecrets] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchSecrets = async () => {
      const { data, error } = await supabase.from("secrets").select();

      // if failed
      if (error) {
        console.log(error);
      }

      // if good
      if (data) {
        setSecrets(data);
      }
    };

    fetchSecrets();
  }, []);

  return (
    <div
      className={classNames(
        "flex flex-col bg-rose-200 rounded-2xl px-10 py-8 w-fit items-center text-rose-900 shadow-xl mx-auto my-4 space-y-4"
      )}
    >
      <h1 className="text-5xl font-semibold mt-4">Your Secrets:</h1>

      {secrets && (
        <div className="flex flex-col">
          {secrets.map((secret) => (
            <a key={secret.id} href={"/secrets/" + secret.id}>
              {secret.title}
            </a>
          ))}
        </div>
      )}
      <div>
        <a
          href="/secrets/new"
          className="bg-yellow-200 text-yellow-800 px-10 py-2 rounded-lg whitespace-nowrap border border-yellow-500"
        >
          add secret :o
        </a>
      </div>
    </div>
  );
}
