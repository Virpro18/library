"use client";

import React from "react";

const ClientCardActions: React.FC<{ itemId: string }> = ({ itemId }) => {
  const handleEdit = () => {
    alert(`Edit item dengan ID: ${itemId}`);
  };

  const handleDelete = () => {
    const confirmed = confirm("Yakin ingin menghapus item ini?");
    if (confirmed) {
      alert(`Hapus item dengan ID: ${itemId}`);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleEdit}
        className="px-4 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default ClientCardActions;
