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
      className="whitespace-nowrap hover:text-purple-100 border-2 border-purple-300 px-4 py-1 hover:bg-purple-500 hover:shadow-xl"
      onClick={signOut}
    >
      sign out
    </button>
  );
}
