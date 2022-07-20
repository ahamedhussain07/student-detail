import Navbar from "../Components/Navbar/Navbar";
import "../styles/globals.css";



function MyApp({ Component, pageProps }) {
  return (
    <Navbar>
      <Component {...pageProps} />
    </Navbar>
  );
}

export default MyApp;
