'use client'
import { useUser } from "@clerk/nextjs"
import { collectionGroup, collection, query, getDocs, getFirestore } from "firebase/firestore"
import {useCollection} from "react-firebase-hooks/firestore"
import { db } from "../../../firebase";
import { useEffect, useState } from "react"

function RepoPage({params : {id}} : {params:{id:string}}) {
  const {user} = useUser();

  const [data, loading, error] = useCollection(query(collection(db, `users/${user?.emailAddresses}/repoNames`)))

  useEffect(() => {
    if (!data) return;
    console.log("DATA IS HERE")
    data.docs.map(doc => {
        console.log(doc.data())
        // filter by id === doc.id
    })
  }, [data]);
  
    return (
    <div className="flex flex-col flex-1 min-h-screen">
      RepoPage: {id}
      {/* fetch repo based on id and create graphs */}
      {/* fetch data from user/useremai/github_repos/{id} and plot */}
    </div>
  )
}
export default RepoPage