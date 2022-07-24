import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { FaBell, FaUserCircle } from "react-icons/fa";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const router = useRouter();

  const [logoutAvailable, setLogoutAvailable] = useState(false);

  useEffect(() => {
    if (router.pathname === "/signin" || router.pathname === "/signup") {
      setLogoutAvailable(true);
    } else {
      setLogoutAvailable(false);
    }
  }, [router.pathname]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap"
        rel="stylesheet"
      ></link>
      <nav className={classes.navbar}>
        <h3>TUNICALABS MEDIA</h3>
        { !logoutAvailable &&
        <div className={classes.subnav}>
          <div>
            <FaBell />
          </div>
          <div className={classes.userAvatar}>
            <FaUserCircle /> Anonymous
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("token");
              return router.replace("/signin");
            }}
          >
            Logout
          </div>
        </div>}
      </nav>
      <main>{props.children}</main>
    </>
  );
};

export default Navbar;
