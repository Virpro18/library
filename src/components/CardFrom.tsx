"use client";

import React from "react";
import { LibraryItem } from "@/types/database";

interface CardFormProps {
  formData: LibraryItem;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPreview: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ formData, onChange, onPreview, onSubmit, onCancel }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <label className="block mb-2 text-sm font-medium text-gray-700">
      Name
      <input
        type="text"
        name="name"
        className="block w-full mt-1 border border-gray-300 rounded-md p-2"
        value={formData.name}
        onChange={onChange}
      />
    </label>

    <label className="block mb-2 text-sm font-medium text-gray-700">
      URL
      <input
        type="url"
        name="url"
        className="block w-full mt-1 border border-gray-300 rounded-md p-2"
        value={formData.url}
        onChange={onChange}
      />
    </label>

    <label className="block mb-2 text-sm font-medium text-gray-700">
      Description
      <textarea
        name="description"
        className="block w-full mt-1 border border-gray-300 rounded-md p-2"
        value={formData.description}
        onChange={onChange}
      ></textarea>
    </label>

    <div className="flex gap-2 mt-4">
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={onPreview}
      >
        Preview
      </button>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
        Save
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  </form>
);

export default CardForm;
