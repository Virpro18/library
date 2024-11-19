import React from "react";
import CardForm from "./CardFrom"; // Komponen client

const CardAdd: React.FC = () => {
  return (
    <div className="bg-gradient-card flex flex-col items-center justify-center p-5 rounded-xl shadow-lg border border-dashed border-gray-300 hover:shadow-xl transition-shadow duration-300">
      <CardForm isAdding />
    </div>
  );
};

export default CardAdd;
