"use client";

import React, { useState } from "react";
import { LibraryItem } from "@/types/database";
import CardForm from "./CardFrom";
import CardPreview from "./CardPreview";
import CardContent from "./CardContent";

const CardItem: React.FC<{ item: LibraryItem; editable: boolean }> = ({ item, editable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<LibraryItem>(item);
  const [previewData, setPreviewData] = useState<LibraryItem | null>(null);

  const handleEditClick = () => setIsEditing(true);
  const handlePreview = () => setPreviewData(formData);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(item);
  };
  const handleSubmit = () => {
    console.log("Submitted:", formData);
    alert("Data berhasil disimpan!");
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
    <div className="bg-gradient-card flex flex-col items-start p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {isEditing ? (
        <CardForm
          formData={formData}
          onChange={handleChange}
          onPreview={handlePreview}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <CardContent item={item} onEdit={handleEditClick} editable={editable} />
      )}

      <CardPreview previewData={previewData} onClose={() => setPreviewData(null)} />
    </div>
    </>
  );
};

export default CardItem;
