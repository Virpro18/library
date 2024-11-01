import { LibraryData } from "@/types/database";
import { promises as fs} from "fs";

export default async function getJson(jsonDir:string) {
    const fileContent = await fs.readFile(jsonDir, 'utf-8')
    const datas:LibraryData = JSON.parse(fileContent)
    return datas
}