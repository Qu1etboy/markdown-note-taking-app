import Sidenav from "./Sidenav";

const Layout = ({ title, children }) => {
  return (
    <div className="flex">
      <Sidenav />
      {children}
    </div>
  );
};

export default Layout;
