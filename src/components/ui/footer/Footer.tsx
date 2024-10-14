import { TitleFont } from "@/config/fonst"
import Link from "next/link"


export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">

        <Link href='/'>
            <span className={`${TitleFont.className} antialiased font-bold`}>Teslo</span>
            <span>| shop</span>
            <span>~ {new Date().getFullYear()} </span>
        </Link>

        <Link href='/' className="mx-3">
            privacidad & Legal  
        </Link>
        <Link href='/' className="mx-3">
            Ubicaciones  
        </Link>
    </div>
  )
}