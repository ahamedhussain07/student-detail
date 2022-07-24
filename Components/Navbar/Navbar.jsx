import { useRouter } from "next/router";

import { FaBell, FaUserCircle } from "react-icons/fa";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const router = useRouter();
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap"
        rel="stylesheet"
      ></link>
      <nav className={classes.navbar}>
        <h3>TUNICALABS MEDIA</h3>
        <div className={classes.subnav}>
          <div>
            <FaBell />
          </div>
          <div className={classes.userAvatar}>
            <FaUserCircle /> Anonymous
          </div>
          <div style={{cursor:"pointer"}}
            onClick={() => {
              localStorage.removeItem("token");
              return router.replace("/signin");
            }}
          >
            Logout
          </div>
        </div>
      </nav>
      <main>{props.children}</main>
    </>
  );
};

export default Navbar;
