"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disabledButton, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
      toast.success("Signup Success");
    } catch (error: any) {
      console.log("Signup Failed", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className=" w-full h-screen p-10 text-black bg-[url('/signup.svg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="bg-white w-[30%] p-5 rounded-lg">
        <h1 className="text-center text-4xl font-bold mb-4">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <div>
          <div className="flex flex-col gap-2 my-4">
            <label className="text-gray-600 font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="outline-none border-b-2 pb-2"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter Username"
              type="text"
            />
          </div>
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
            onClick={onSignup}
          >
            {disabledButton ? "Please fill Form" : "Sign Up"}
          </button>
          <div className="mt-10 text-center">
            <p>Already have an account?</p>
            <Link
              href={"/login"}
              className="text-blue-500 font-semibold underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
