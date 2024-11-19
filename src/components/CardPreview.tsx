"use client";

import React from "react";
import { LibraryItem } from "@/types/database";

interface CardPreviewProps {
  previewData: LibraryItem | null;
  onClose: () => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({ previewData, onClose }) => {
  if (!previewData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{previewData.name}</h3>
        <div className="relative w-full h-52 mb-3 rounded-lg overflow-hidden bg-gray-100">
          <iframe
            src={previewData.url}
            className="w-full h-full border-none pointer-events-none"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <p className="text-sm text-gray-700 mb-4">{previewData.description}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};

export default CardPreview;
