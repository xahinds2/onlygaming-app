import HomePage from "@/components/nearby/HomePage";
import { cookies } from "next/headers";

export default function Home() {
  const cookieCoords = cookies().get("localCoords");
  const localCoords = cookieCoords ? JSON.parse(cookieCoords.value) as number[] : [];

  return <HomePage localCoords={localCoords}/>
}
