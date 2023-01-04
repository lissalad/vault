import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function SignOutButton() {
  const supabase = useSupabaseClient();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  return <button onClick={signOut}>sign out</button>;
}
