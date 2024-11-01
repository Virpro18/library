export const date = () => {
  const time = new Date();
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0"); // Menambahkan 1 ke bulan dan menambahkan '0' di depan jika perlu
  const day = String(time.getDate()).padStart(2, "0"); // Menambahkan '0' di depan jika perlu
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);
  return formattedDate;
};
