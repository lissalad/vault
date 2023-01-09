import Header from "../components/Header";
import QuickHide from "../components/QuickHide";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Layout = ({ children }) => {
  const session = useSession();

  return (
    <div id="main-wrapper">
      {session ? <Header /> : <></>}
      <div className="page-wrapper">
        <div className="">{children}</div>
      </div>
      {/* <QuickHide /> */}
    </div>
  );
};

export default Layout;
