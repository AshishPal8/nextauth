"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.data._id);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className=" w-full h-screen p-10 text-black bg-[url('/profile.svg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="bg-white w-[30%] p-5 rounded-lg">
        <h1 className="text-center text-4xl font-bold mb-4">User Profile</h1>
        <h2 className="text-center text-lg">
          {data === "nothing" ? (
            "No data available"
          ) : (
            <Link href={`/profile/${data}`}>test{data}</Link>
          )}
        </h2>
        <button
          className="bg-gradient-to-r from-[#469a31] via-[#117d17] to-[#074d04]  w-full py-2 rounded-lg text-white font-semibold text-xl my-3"
          onClick={getUserDetails}
        >
          Get User
        </button>

        <button
          className="bg-gradient-to-r from-[#fd4e4e] via-[#ff3535] to-[#b40606]  w-full py-2 rounded-lg text-white font-semibold text-xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
