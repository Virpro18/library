import Cards from "@/components/Cards";
import { LibraryData } from "@/types/database";
import {  jsonDatabase } from "@/components/lib/database";
export default async function Home() {
  const datas:LibraryData = await jsonDatabase();
  // if (error) {
  //   return <p>{error.message}</p>;
  // }
  return (
    <div>
      <section className="grid md:grid-cols-4 grid-cols-auto w-full gap-4 mt-4 p-4">
      {datas.data.map((data, index) => [<Cards key={index} data={data} />])}
      </section>
    </div>
  );
}
