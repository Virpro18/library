// Interface untuk setiap item data di dalam array
export interface LibraryItem {
  id: string;
  name: string;
  description: string;
  url: string;
  created_at: Date | string;
  [key: string]: string | Date | string[]
}
export interface ApiItem {
  database: string;
  data: Partial<LibraryItem>;
}

// Interface utama yang memiliki array `data` dengan tipe `LibraryItem[]`
export interface LibraryData {
  length: number;
  data: LibraryItem[];
}

export interface AdminData {
  username: string;
  email?: string;
  password: string;
}
