import Cards from "@/components/Cards";
import { LibraryData } from "@/types/database";
import {  jinx } from "@/components/lib/database";
export default async function Home() {
    const datas:LibraryData =await jinx.select();
    console.log(datas)
  // if (error) {
  //   return <p>{error.message}</p>;
  // }
  return (
    <div>
      <section className="grid md:grid-cols-4 grid-cols-auto w-full gap-4 mt-4 p-4">
      <Cards data={datas.data} />
      </section>
    </div>
  );
}
