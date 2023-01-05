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
    <div className="box">
      <h1 className={classNames("text-center flex flex-col items-center")}>
        Your Secrets:
      </h1>
      <div>
        {secrets && (
          <div className="flex flex-col">
            {secrets.map((secret) => (
              <a key={secret.id} href={"/secrets/" + secret.id}>
                {secret.title}
              </a>
            ))}
          </div>
        )}
      </div>

      <div>
        <a href="/secrets/new" className="button">
          new secret
        </a>
      </div>
    </div>
  );
}
