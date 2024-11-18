import { LibraryData } from "@/types/database";
import Cards from "@/components/Cards";
import { jinx } from "@/components/lib/database";

export default async function Home() {
  const { data }: LibraryData = await jinx.select("library");

  return (
    <div className="flex items-center">
      <section className="grid grid-cols-auto w-full gap-4 mt-4 p-4">
        <Cards data={data} editable/>
      </section>
    </div>
  );
}

/*
TODO:
- [X] Styling this page
- [X] Create input data project
- [X] Create input data admin
*/
