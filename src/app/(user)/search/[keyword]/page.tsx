import { jinx } from "@/components/lib/database";
import Cards from "@/components/Cards";
import { LibraryItem } from "@/types/database";
import { redirect } from "next/navigation";
const searchPage = async ({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) => {
  const rawKeyword = (await params).keyword;
  if(rawKeyword === "Admin") {
    return redirect("/addData")
  }
  const keyword = decodeURI(rawKeyword)
  // console.log(`keyword: ${keyword}`)
  const datas: LibraryItem[] = await jinx.select("library",{ name: keyword });
  // console.log(datas)
  return (
    <div>
      <section className="grid md:grid-cols-4 grid-cols-auto w-full gap-4 mt-4 p-4">
      <Cards data={datas} />
      </section>
    </div>
  );
};

export default searchPage;
