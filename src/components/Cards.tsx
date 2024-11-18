import React from "react";
import { LibraryItem } from "@/types/database";
import ClientCardActions from "./ClientCardsAction"; // Client Component untuk tombol edit/delete


const Cards: React.FC<{ data?: LibraryItem[]; editable?: boolean }> = ({ data, editable = false }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-4 text-gray-500">No items to display</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-gradient-card flex flex-col items-start p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.name}</h3>
          <div className="relative w-full h-52 mb-3 rounded-lg overflow-hidden bg-gray-100">
            {/* Iframe non-interactive untuk meningkatkan performa */}
            <iframe
              src={item.url}
              className="w-full h-full border-none pointer-events-none"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="text-sm text-gray-700 mb-4">{item.description}</p>

          {/* Tombol Edit dan Delete (jika mode editable diaktifkan) */}
          {editable && <ClientCardActions itemId={item.id} />}
        </div>
      ))}
    </div>
  );
};

export default Cards;
