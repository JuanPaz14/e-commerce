import { inter, TitleFont } from "@/config/fonst";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className={inter.className}>hola mundo </h1>
      <h1 className={TitleFont.className}>hola mundooo</h1>
    </div>
  );
}
