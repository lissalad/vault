import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function SignOutButton() {
  const supabase = useSupabaseClient();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  return (
    <button className="whitespace-nowrap hover:text-sky-900" onClick={signOut}>
      sign out
    </button>
  );
}
