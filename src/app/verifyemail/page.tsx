"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className=" w-full h-screen p-10 text-black bg-[url('/verify.svg')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="bg-white w-[40%] p-5 rounded-lg">
        <h1 className="text-center text-4xl font-bold mb-4">Verify Email</h1>
        <h2 className="text-center bg-green-400 p-2 rounded-md break-words">
          {token ? `${token}` : "No Token"}
        </h2>
        {verified && (
          <div>
            <h2>Verified</h2>
            <Link
              href={"/login"}
              className="text-blue-500 font-semibold underline"
            >
              Login
            </Link>
          </div>
        )}
        {error && (
          <div className="text-center">
            <h2 className="text-red-500 text-lg font-semibold">Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}
