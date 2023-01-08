import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import classNames from "classnames";
import { RightArrow, DownArrow, Trash, Pencil } from "../components/Icons";
import { Menu } from "@headlessui/react";

export default function Secrets() {
  const [secrets, setSecrets] = useState();
  // const [selectedSecret, setSelectedSecret] = useState();
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

  async function handleDelete(id) {
    const { data, error } = await supabase
      .from("secrets")
      .delete()
      .match({ id: id });
    setSecrets(secrets.filter((secret) => secret.id !== id));
  }

  return (
    <div className="w-full mt-4">
      <div>
        <h1 className={classNames("text-2xl mb-5 text-center")}>
          Your Secret Vault
        </h1>

        {secrets && (
          <div className="flex flex-col bg-stone-400 border-8 border-black shadow-xl rounded-sm w-full h-[600px] py-3 relative">
            <a href="/secrets/new" className="absolute right-4 bottom-4 button">
              new
            </a>
            {secrets.map((secret) => (
              <div
                key={secret.id}
                className="w-full border-b-0 border-stone-500/70 last:border-b-0"
              >
                <Menu>
                  <Menu.Button className="text-2xl flex flex-row space-x-4 w-full justify-between items-center pl-6 py-3 hover:bg-stone-500/70">
                    <div
                      className="flex flex-row space-x-4"
                      // onClick={setSelectedSecret(secret)}
                    >
                      <div className="ui-open:rotate-90">&gt;</div>
                      <p>{secret.title}</p>
                    </div>
                    <div className="flex flex-row ui-not-open:invisible ui-open:visible px-4 space-x-2">
                      <a
                        href={"/secrets/edit/" + secret.id}
                        className="p-3 hover:bg-yellow-200/80 rounded-2xl"
                      >
                        <Pencil />
                      </a>
                      <button
                        className="p-3 hover:bg-red-200/80 rounded-2xl"
                        onClick={() => handleDelete(secret.id)}
                      >
                        <Trash />
                      </button>
                    </div>
                  </Menu.Button>
                  <Menu.Items>
                    <Menu.Item>
                      {({ active }) => (
                        <p className="indent-5 px-16 py-3">{secret.content}</p>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
{
  /* */
}
