// export default async function Page({
//     params,
//   }: {
//     params: Promise<{ slug: string }>
//   }) {
//     const slug = (await params).slug
//     return <div>My Post: {slug}</div>
//   }

  const searchPage = async ({params}:{params:Promise<{id:number}>}) => {
    const id = (await params).id
    return <div>My Post: {id}</div>
  }

  export default searchPage