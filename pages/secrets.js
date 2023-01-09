import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import classNames from "classnames";
import { RightArrow, DownArrow, Trash, Pencil } from "../components/Icons";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Secrets() {
  const session = useSession();
  const [secrets, setSecrets] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchSecrets = async () => {
      const { data, error } = await supabase.from("secrets").select();
      //  .eq("user_id", session?.user.id)

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

  // useEffect(() => {
  //   if (!session?.user) {
  //     router.push("/");
  //   }
  // }, [router, session?.user]);

  async function handleDelete(id) {
    const { data, error } = await supabase
      .from("secrets")
      .delete()
      .match({ id: id });
    setSecrets(secrets.filter((secret) => secret.id !== id));
  }

  return (
    // <>
    //   {session?.user ? (
    <div className="w-full mt-4">
      <div>
        <h1 className="title">Your Secret Vault</h1>

        {secrets && (
          <div className="flex flex-col bg-stone-400 border-8 border-black shadow-xl rounded-sm h-[600px] py-3 relative mt-8">
            <Link
              href="/secrets/new"
              className="absolute right-4 bottom-4 button bg-purple-100 text-purple-800 hover:bg-purple-500 border-purple-500 "
            >
              new
            </Link>
            {secrets.map((secret) => (
              <div
                key={secret.id}
                className="w-full border-b-0 border-stone-500/70 last:border-b-0"
              >
                <Menu>
                  <Menu.Button className="md:text-2xl flex flex-row space-x-4 w-full justify-between items-center px-6 md:py-3 py-1 hover:bg-stone-500/70">
                    <div
                      className="flex flex-row space-x-4"
                      // onClick={setSelectedSecret(secret)}
                    >
                      <div className="ui-open:rotate-90 transition-all">
                        &gt;
                      </div>
                      <p>{secret.title}</p>
                    </div>
                    <div className="flex flex-row items-center ui-not-open:invisible ui-open:visible space-x-2 text-xs">
                      <a
                        href={"/secrets/edit/" + secret.id}
                        className="border-2 px-3 py-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-300 border-yellow-300 md:mb-0 mb-4"
                      >
                        {/* <Pencil /> */}
                        <p>edit</p>
                      </a>
                      <button
                        className=" hover:bg-red-200/80 rounded-2xl"
                        onClick={() => handleDelete(secret.id)}
                      >
                        {/* <Trash /> */}
                        <p className="border-2 px-3 py-1 bg-red-100 text-red-800 hover:bg-red-300 border-red-300 md:mb-0 mb-4">
                          delete
                        </p>
                      </button>
                    </div>
                  </Menu.Button>
                  <Menu.Items>
                    <Menu.Item>
                      {({ active }) => (
                        <p className="indent-5 md:px-16 px-5 py-3 text-sm">
                          {secret.content}
                        </p>
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
    //   ) : (
    //     <p>redirecting</p>
    //   )}
    // </>
  );
}
