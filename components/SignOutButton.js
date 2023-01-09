import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function SignOutButton() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  }
  return (
    <button
      className="whitespace-nowrap border-4 border-black bg-stone-50/20 px-4 py-1 hover:shadow-xl hover:bg-stone-600 hover:text-stone-200"
      onClick={signOut}
    >
      sign out
    </button>
  );
}
