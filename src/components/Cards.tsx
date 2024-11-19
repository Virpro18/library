import React from "react";
import { LibraryItem } from "@/types/database";
import CardItem from "./CardItem"; // Client Component untuk setiap item card

const Cards: React.FC<{ data?: LibraryItem[]; editable?: boolean }> = ({ data, editable = false }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-4 text-gray-500">No items to display</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {data.map((item) => (
        <CardItem key={item.id} item={item} editable={editable} />
      ))}
    </div>
  );
};

export default Cards;
