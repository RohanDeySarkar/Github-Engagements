'use client'

import {useCollection} from "react-firebase-hooks/firestore"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import { auth } from "@clerk/nextjs/server"
import { useUser } from "@clerk/nextjs"
import { collectionGroup, collection, query, getDocs, getFirestore } from "firebase/firestore"
import { db } from "../firebase";
import { useEffect, useState } from "react"
import SidebarOption from "./SidebarOption"
// import { db } from "@/firebase"
// import { adminDb } from "@/firebase-admin";

interface Repos {
    id: string;
    name: string;
}
  
function Sidebar() {
    const [repos, setRepos] = useState<Repos[]>([]);

    const {user} = useUser();

    // data missing
    const [data, loading, error] = useCollection(query(collection(db, `users/${user?.emailAddresses}/repoNames`)));
    
    useEffect(() => {
        if (!data) return;

        data.docs.map(doc => {
            // console.log(doc.id)
            // console.log(doc.data().repoName)
            // setRepos([...repos, { id: doc.id, name: doc.data().repoName }]);
            setRepos(prevItems => ([...prevItems, { id: doc.id, name: doc.data().repoName }]))
        })
      }, [data]);

    // console.log(repos)
    const menuOptions = (
        <>
            <NewDocumentButton />
            
            <div className="flex py-4 flex-col space-y-4 md:max-w-36">
                {repos.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">
                        No Repos Found
                    </h2>
                ):(
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">
                            My Repos
                        </h2>
                        {repos.map((doc) => (
                            <SidebarOption 
                                key={doc.id}
                                id={doc.id}
                                name={doc.name}
                                href={`/repo/${doc.id}`}
                            />
                        ))}
                    </>
                )}
            </div>
        </>
    )

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <MenuIcon
                        className="p-2 hover:opacity-30 rounded-lg"
                        size={40}
                    />
                </SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        
                        <div>
                            {menuOptions}
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
        
        <div className="hidden md:inline">
            {menuOptions}
        </div>
    </div>
  )
}
export default Sidebar