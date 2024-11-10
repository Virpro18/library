"use client";
import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
const InputSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
  
  function Submit(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement>) {
    event.preventDefault();
    if (search === "") {
      alert("stop it GSH")
      return
    }
    router.push(`/search/${search}`)
    console.log(search);
    if (search === "Admin") {
      setSearch("");
    }
    return
  }
  return (
    <form onSubmit={Submit} className="relative">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full h-10 md:px-4 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-secondary transition-all"
      />
      <MagnifyingGlass size={24} className="absolute top-2 right-2 hover:cursor-pointer" onClick={Submit}/>
    </form>
  );
};

export default InputSearch;
