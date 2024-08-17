'use client'
import { useUser } from "@clerk/nextjs"
import { collectionGroup, collection, query, getDocs, getFirestore } from "firebase/firestore"
import {useCollection} from "react-firebase-hooks/firestore"
import { db } from "../../../firebase";
import { useEffect, useState } from "react"
import Dashboard from "@/components/Dashboard";
import { Skeleton } from "@/components/ui/skeleton"

interface Language {
  language: string;
  loc: number;
}

function RepoPage({params : {id}} : {params:{id:string}}) {
  const {user} = useUser();

  const [data, loading, error] = useCollection(query(collection(db, `users/${user?.emailAddresses}/repos`)))
  
  // multiple [state, setState] = useState() for data fields
  const [repoName, setRepoName] = useState<string>("")
  const [homepage, sethomepage] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [createdAt, setCreatedAt] = useState<string>("")
  const [forks, setForks] = useState<number | undefined>()
  const [stars, setStars] = useState<number | undefined>()
  const [languages, setLanguages] = useState<Language[]>([])
  
  useEffect(() => {
    if (!data) return;
    
    data.docs.map(doc => {
      if(doc.id === id) {
        // console.log(doc.data())
        const data = doc.data()
        setRepoName(data.repoName)
        sethomepage(data.homepage)
        setDescription(data.description)
        setCreatedAt(data.created_at)
        setForks(data.forks)
        setStars(data.stars)
        setLanguages(data.languages)
      }
    })
  }, [data]);
    return (
    <>
      {repoName.length > 2 ? (
        <Dashboard
          repoName={repoName}
          homepage={homepage}
          description={description}
          createdAt={createdAt}
          forks={forks}
          stars={stars}
          languages={languages}
        />
        
      ):(
        <div className="flex flex-col items-center justify-center flex-1 min-h-screen">
          <div className="space-y-2">
          <Skeleton className="h-[200px] w-[400px] md:h-[425px] md:w-[550px] rounded-xl bg-slate-200" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] md:w-[450px] bg-slate-200" />
            <Skeleton className="h-4 w-[150px] md:w-[350px] bg-slate-200" />
            <Skeleton className="h-4 w-[100px] md:w-[250px] bg-slate-200" />
          </div>
          </div>
        </div>
      )}
    </>
  )
}
export default RepoPage