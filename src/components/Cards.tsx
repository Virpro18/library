import React from "react";
import { LibraryItem } from "@/types/database";

const Cards: React.FC<{ data?: LibraryItem[] }> = ({ data }) => {
  console.log(data)
  console.log("cards")
  if (!data || data.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <>
      {data.map((item) => (
        <div key={item.id} className="bg-color-tertiary flex flex-col items-center">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </>
  );
};

export default Cards;
