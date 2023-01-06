import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div id="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
