"use client";

import { useState } from "react";

const LoginInput = () => {
  const [User, setUser] = useState("");
  const [Pass, setPass] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(User, Pass);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  return (
    <>
      <form
        className="flex flex-col bg-color-accent p-4 rounded-lg text-color-secondary"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">username or email</label>
        <input
          type="text"
          placeholder="username or email"
          id="username"
          autoComplete="on"
          onChange={handleUserChange}
          className="w-full h-10 md:px-4 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-secondary transition-all"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          autoComplete="current-password"
          onChange={handlePassChange}
          className="w-full h-10 md:px-4 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-secondary transition-all"
        />
        <button 
          type="submit" 
          className="text-color-secondary bg-color-tertiary p-2 rounded-md hover:text-color-primary hover:bg-color-secondary font-bold transition-all mt-4"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginInput;
