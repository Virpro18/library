export interface databaseType {
  id: number;
  name: string;
  description: string;
  url: string;
  created_at: Date;
}

export interface jsonData {
  length: number;
  data: [
    {
      id: number;
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      province: string;
      country: string;
      zip_code: string;
    }
  ];
  meta:{
    code:number;
    message:string;
  }
}

// Interface untuk setiap item data di dalam array
export interface LibraryItem {
  id: number;
  name: string;
  description: string;
  url: string;
  created_at: Date | string;
}

// Interface utama yang memiliki array `data` dengan tipe `LibraryItem[]`
export interface LibraryData {
  length: number;
  data: LibraryItem[];
}

