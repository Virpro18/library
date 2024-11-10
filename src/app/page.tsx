import Cards from "@/components/Cards";
import { LibraryData } from "@/types/database";
import { jinx } from "@/components/lib/database";
import Header from "@/components/Header";
export default async function Home() {
  const { data }: LibraryData = await jinx.select("library");
  // console.log(data)
  // if (error) {
  //   return <p>{error.message}</p>;
  // }
  return (
    <>
      <Header />

      <div>
        <section className="grid md:grid-cols-4 grid-cols-auto w-full gap-4 mt-4 p-4">
          <Cards data={data} />
        </section>
      </div>
    </>
  );
}
