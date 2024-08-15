'use client'


import Link from "next/link"
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore"
import { db } from "../firebase";
import { usePathname } from "next/navigation";

interface Props {
    href: string;
    id: string;
    name: string;
}

function SidebarOption({href, id, name} : Props) {
    // const [data, loading, error] = useDocumentData(doc)
    // const pathname = usePathname();
    // const isActive = 
  return (
    <Link href={href} className={``}>
        <p>{name}</p>
    </Link>
  )
}
export default SidebarOption