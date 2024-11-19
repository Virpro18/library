
# Dokumentasi Komponen Cards dengan Fitur Edit dan Preview

## Deskripsi
Komponen ini dirancang untuk menampilkan daftar kartu (cards) yang dapat diedit langsung di tempat (inline editing). 
Setelah menekan tombol **Edit**, kartu akan berubah menjadi form. Data yang telah diubah dapat di-preview sebelum disimpan ke database.

---

## Struktur File
```
components/
  ├── Cards.tsx
  ├── CardItem.tsx
  └── ClientCardActions.tsx (opsional)
```

---

## File: `Cards.tsx`
Komponen ini merupakan **Server Component** yang berfungsi untuk merender daftar kartu dari data yang diterima.

### Props
| Nama       | Tipe              | Deskripsi                           |
|------------|-------------------|-------------------------------------|
| `data`     | `LibraryItem[]`   | Data array untuk menampilkan kartu. |
| `editable` | `boolean`         | Jika `true`, kartu dapat diedit.    |

### Kode
```tsx
import React from "react";
import { LibraryItem } from "@/types/database";
import CardItem from "./CardItem";

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
```

---

## File: `CardItem.tsx`
Komponen ini adalah **Client Component** yang bertanggung jawab atas setiap kartu. Kartu dapat beralih antara mode tampilan biasa (read-only) dan mode edit.

### State
| Nama          | Tipe                 | Deskripsi                                               |
|---------------|----------------------|--------------------------------------------------------|
| `isEditing`   | `boolean`            | Menentukan apakah kartu sedang dalam mode edit.        |
| `formData`    | `LibraryItem`        | Menyimpan data yang sedang diedit di form.             |
| `previewData` | `LibraryItem | null` | Data yang ditampilkan dalam preview sebelum disimpan.  |

### Props
| Nama       | Tipe            | Deskripsi                                         |
|------------|-----------------|---------------------------------------------------|
| `item`     | `LibraryItem`   | Objek data yang akan ditampilkan di kartu.        |
| `editable` | `boolean`       | Jika `true`, kartu akan memiliki tombol **Edit**. |

### Kode
```tsx
"use client";

import React, { useState } from "react";
import { LibraryItem } from "@/types/database";

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
```

---

## Proses Kerja
1. Data ditampilkan dalam kartu melalui komponen `Cards`.
2. Klik tombol **Edit** untuk mengubah kartu menjadi form.
3. Isi form lalu klik **Preview** untuk melihat pratinjau data yang diubah.
4. Klik **Save** untuk menyimpan atau **Cancel** untuk membatalkan perubahan.

---

Dengan dokumentasi ini, pengembang lain dapat memahami struktur dan fungsionalitas dari komponen ini.
