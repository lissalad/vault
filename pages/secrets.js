import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import classNames from "classnames";
import { RightArrow } from "../components/Icons";

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
    <div className="w-full">
      <div>
        <h1 className={classNames("text-2xl mb-4 text-center")}>
          Your Secret Vault
        </h1>

        {secrets && (
          <div className="flex flex-col bg-stone-400 border-8 border-stone-600 shadow-xl rounded-xl w-full h-[600px] py-3">
            {secrets.map((secret) => (
              <a
                className="text-xl hover:bg-stone-300 px-6 py-3 flex flex-row space-x-4"
                key={secret.id}
                href={"/secrets/" + secret.id}
              >
                <RightArrow />
                <p>{secret.title}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
{
  /* <a href="/secrets/new" className="button absolute">
              new
            </a> */
}
