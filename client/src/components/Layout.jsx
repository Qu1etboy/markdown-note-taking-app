import { useEffect } from "react";
import Sidenav from "./Sidenav";

const Layout = ({ title, children }) => {
  useEffect(() => {
    var t = "Note App";
    if (title !== undefined) {
      t = title + " - Note App";
    }
    window.document.title = t;
  }, []);
  return children;
};

export default Layout;
