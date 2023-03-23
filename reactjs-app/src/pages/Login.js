/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let user;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("https://cms-admin.ihsansolusi.co.id/testapi/auth/login", {
        email,
        password,
      });

      console.log(data);
      localStorage.setItem("user-token", data.token);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    user = localStorage.getItem("user-token");
    user && navigate("/");
    setLoading(false);
  }, [isLoggedIn]);

  return (
    <Fragment>
      {!isLoggedIn && (
        <div className="w-screen h-screen flex flex-col md:justify-center items-center">
            <h1 className='m-10 text-4xl'> Login </h1>
          <form className="p-2 flex flex-col container max-w-screen-sm">
            <div className="grid grid-rows-2 gap-4">
              <input
                className="px-2 py-3 border-2 rounded-md border-black-100"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Email"
                type="email"
                autoComplete="email"
              />
              <input
                className="px-2 py-3 border-2 rounded-md border-black-100"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
            {error && <h1 className="p-3 mt-4 bg-red-200">{error}</h1>}
            {loading ? (
              <button
                disabled
                className="px-2 py-3 mt-10 flex justify-center items-center bg-slate-200 rounded-md"
              >
                <Loading />
                Login
              </button>
            ) : (
              <button
                className="px-2 py-3 mt-10 flex justify-center items-center bg-blue-400 rounded-md"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </form>
          <p className="py-2 text-center">
            Don’t have an account?{" "}
            <Link className="border-b-2 border-purple" to="/signup">
              Sign Up for Free
            </Link>
          </p>
        </div>
      )}
    </Fragment>
  );
}

export default login;