import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import classes from "./Auth.module.css";

const AuthPage = () => {
  const router = useRouter();

  const isSignup = router.pathname === "/signup";

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [check, setCheck] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const { email, password, confirmPassword } = user;

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "checkbox") {
      setCheck(!check);
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = () => {
    return isSignup ? router.push("/signin") : router.push("/signup");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isSignup) {
      if (password.length < 6 || confirmPassword.length < 6) {
        setError("password should atleast 6 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("password should be same");
        return;
      }

      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.NEXT_PUBLIC_FIREBASE_API,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!res.ok) return setError("email already exists");

        const data = await res.json();

        localStorage.setItem("token", data.idToken);

        return router.push("/");
      } catch (error) {
        return;
      }
    } else {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            process.env.NEXT_PUBLIC_FIREBASE_API,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!res.ok) return setError("invalid credentials");

        const data = await res.json();

        localStorage.setItem("token", data.idToken);
        return router.push("/");
      } catch (error) {
        return;
      }
    }
  };

  useEffect(() => {
    let isUser;

    if (isSignup) {
      isUser = Object.values({
        confirmPassword,
        password,
        email,
      }).every((item) => Boolean(item));
      isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
    } else {
      isUser = Object.values({
        password,
        email,
      }).every((item) => Boolean(item));
      isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
    }

    !check && setSubmitDisabled(true);
  }, [user, check]);

  useEffect(() => {
    if (error) {
      setInterval(() => {
        setError("");
      }, 4000);
    }
  }, [error]);

  return (
    <>
      <div className={classes.authPage}>
        <div className={error ? classes.errorMsg : ""}>{error && error}</div>
        <form className={classes.formAuth} onSubmit={submitHandler}>
          <h3>Sign {isSignup ? "Up" : "In"} Now</h3>
          <input
            type="email"
            name="email"
            value={email}
            onChange={inputHandler}
            placeholder="    Your Email*"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={inputHandler}
            placeholder="    Your Password*"
          />
          {isSignup && (
            <input
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={inputHandler}
              placeholder="    Confirm Password*"
            />
          )}
          <div>
            <input
              type="checkbox"
              name="checkbox"
              onClick={inputHandler}
              value={true}
            />{" "}
            <span style={{ fontSize: "0.8rem" }}>
              I agree to the Terms Of Services
            </span>
          </div>
          <button className={submitDisabled ? classes.disable : ""}>
            Sign {isSignup ? "Up" : "In"}
          </button>
          <div>
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "#8c1818", fontWeight: 600 }}
              onClick={handleChange}
            >
              Sign {isSignup ? "In" : "Up"}
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthPage;
