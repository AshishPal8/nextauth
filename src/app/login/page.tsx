"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disabledButton, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
      toast.success("Login Success");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className=" w-full h-screen p-10 text-black bg-[url('/login.svg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="bg-white w-[30%] p-5 rounded-lg">
        <h1 className="text-center text-4xl font-bold mb-4">
          {loading ? "Processing..." : "Login"}
        </h1>
        <div>
          <div className="flex flex-col gap-2 my-4">
            <label className="text-gray-600 font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="outline-none border-b-2 pb-2"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2 my-4">
            <label className="text-gray-600 font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="outline-none border-b-2 pb-2"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter Password"
              type="password"
            />
          </div>
          <button
            className="bg-gradient-to-r from-[#6198FF] via-[#0066FF] to-[#004CBB]  w-full py-2 rounded-lg text-white font-semibold text-xl"
            onClick={onLogin}
          >
            {disabledButton ? "Please fill Form" : "Login"}
          </button>
          <div className="mt-10 text-center">
            <p>Don`t have an account?</p>
            <Link
              href={"/signup"}
              className="text-blue-500 font-semibold underline"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
