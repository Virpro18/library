"use client";

import React, { useState } from "react";
import { LibraryItem } from "@/types/database";

const CardItem: React.FC<{ item: LibraryItem; editable: boolean }> = ({ item, editable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<LibraryItem>(item);
  const [previewData, setPreviewData] = useState<LibraryItem | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handlePreview = () => {
    setPreviewData(formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(item); // Reset ke data asli
  };

  const handleSubmit = () => {
    // Simulasi pengiriman data ke database
    console.log("Submitted:", formData);
    alert("Data berhasil disimpan!");
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gradient-card flex flex-col items-start p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Name
            <input
              type="text"
              name="name"
              className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            URL
            <input
              type="url"
              name="url"
              className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              value={formData.url}
              onChange={handleChange}
            />
          </label>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
            <textarea
              name="description"
              className="block w-full mt-1 border border-gray-300 rounded-md p-2"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handlePreview}
            >
              Preview
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
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
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </>
      )}

      {/* Preview Modal */}
      {previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {previewData.name}
            </h3>
            <div className="relative w-full h-52 mb-3 rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src={previewData.url}
                className="w-full h-full border-none"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="text-sm text-gray-700 mb-4">{previewData.description}</p>
            <button
              onClick={() => setPreviewData(null)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardItem;
