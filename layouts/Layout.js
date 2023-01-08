import Header from "../components/Header";
import QuickHide from "../components/QuickHide";

const Layout = ({ children }) => {
  return (
    <div id="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="">{children}</div>
      </div>
      {/* <QuickHide /> */}
    </div>
  );
};

export default Layout;
