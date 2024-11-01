"use client";
import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const InputSearch = () => {
  const [search, setSearch] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(search);
  }
  return (
    <form onSubmit={Submit} className="relative">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search..."
        className="w-full h-10 md:px-4 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-secondary transition-all"
      />  
      <MagnifyingGlass size={24} className="absolute top-2 right-2"/>
    </form>
  );
};

export default InputSearch;
