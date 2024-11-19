"use client";

import React from "react";
import { LibraryItem } from "@/types/database";

interface CardContentProps {
  item: LibraryItem;
  onEdit: () => void;
  editable: boolean;
}

const CardContent: React.FC<CardContentProps> = ({ item, onEdit, editable }) => (
  <>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.name}</h3>
    <div className="relative w-full h-52 mb-3 rounded-lg overflow-hidden bg-gray-100">
      <iframe
        src={item.url}
        className="w-full h-full border-none pointer-events-none"
        allowFullScreen
        loading="lazy"
      />
    </div>
    <p className="text-sm text-gray-700 mb-4">{item.description}</p>
    {editable && (
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Edit
      </button>
    )}
  </>
);

export default CardContent;
