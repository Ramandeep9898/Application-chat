import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";

export const RegisterContainer = () => {
  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { username, password, confirmPassword, email } = registerInfo;
      const { data } = await axios.post(registerRoute, {
        username,
        password,
        email,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const validateForm = () => {
    const { username, password, confirmPassword, email } = registerInfo;
    if (username === "") {
      toast.error("username is required.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password Should be Greater than or equal to 8 characters.",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password doesn't match with confirm password.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("email is required.", toastOptions);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-600"></div>
      </div>

      <div className="absolute top-0 left-0 -translate-x-[60%] -translate-y-[75%] z-10">
        <div className="border-[8px] border-white rounded-full w-80 h-80 opacity-20"></div>
      </div>

      <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
        <div className="relative self-stretch px-4 py-16 overflow-hidden bg-blue-600 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24">
          <div className="absolute bottom-0 right-0 translate-x-[25%] translate-y-[75%]">
            <div className="border-[8px] border-white rounded-full w-96 h-96 opacity-20 lg:opacity-100"></div>
          </div>

          <div className="relative flex flex-col justify-between h-full max-w-lg mx-auto lg:mr-auto lg:max-w-md">
            <div className="flex-1">
              <h2 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl xl:text-6xl">
                Welcome to our community
              </h2>
              <p className="mt-4 text-base font-normal leading-7 text-blue-300 lg:text-lg lg:mt-6 lg:leading-8">
                Join Now!
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-16 w-full bg-white sm:px-6 lg:col-span-3 lg:py-8 lg:px-1 xl:pl-1">
          <div className="max-w-lg ml-[80px] xl:max-w-xl">
            <h2 className="text-3xl w-full font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Welcome to our community
            </h2>

            <div className="mt-6 space-y-12 sm:mt-16 lg:mt-10">
              <div className="space-y-5">
                <div>
                  <label
                    for="username"
                    className="text-base font-medium text-gray-900"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="TEXT"
                      name="username"
                      value={registerInfo.username}
                      onChange={(e) =>
                        setRegisterInfo({
                          ...registerInfo,
                          username: e.target.value,
                        })
                      }
                      id="username"
                      className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={registerInfo.email}
                      onChange={(e) =>
                        setRegisterInfo({
                          ...registerInfo,
                          email: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      value={registerInfo.password}
                      onChange={(e) =>
                        setRegisterInfo({
                          ...registerInfo,
                          password: e.target.value,
                        })
                      }
                      id="password"
                      className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      value={registerInfo.confirmPassword}
                      onChange={(e) =>
                        setRegisterInfo({
                          ...registerInfo,
                          confirmPassword: e.target.value,
                        })
                      }
                      id="password"
                      className="block w-full px-4 py-4 text-base text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={registerHandler}
                className="inline-flex items-center justify-center px-12 py-4 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
              >
                Sign Up
              </button>
            </div>
            <ToastContainer />
            <p className="mt-6 text-sm font-normal text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
