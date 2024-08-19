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

interface Issue {
  issue: string;
  href : string;
  user: string;
}

interface Commit {
  commits: number;
  date: string;
}

interface TopContributor {
  author: string;
  commits: number;
}

interface TopicInterest {
  date: string;
  popularity: number;
}

function RepoPage({params : {id}} : {params:{id:string}}) {
  const {user} = useUser();

  const [data, loading, error] = useCollection(query(collection(db, `users/${user?.emailAddresses}/repos`)))
  
  // multiple [state, setState] = useState() for data fields
  const [repoName, setRepoName] = useState<string>("")
  const [homepage, sethomepage] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [updatedAt, setupdatedAt] = useState<string>("")
  const [forks, setForks] = useState<number | undefined>()
  const [stars, setStars] = useState<number | undefined>()
  const [languages, setLanguages] = useState<Language[]>([])
  const [issues, setIssues] = useState<Issue[]>([])
  const [contributors, setContributors] = useState<number | undefined>()
  const [latestRelease, setLatestRelease] = useState<string>("")
  const [commitsPerDay, setCommitsPerDay] = useState<Commit[]>([])
  const [topContributors, setTopContributors] = useState<TopContributor[]>([])
  const [topicInterests, setTopicInterests] = useState<TopicInterest[]>([])
  
  useEffect(() => {
    if (!data) return;
    
    data.docs.map(doc => {
      if(doc.id === id) {
        console.log(doc.data())
        const data = doc.data()
        setRepoName(data.repoName)
        sethomepage(data.homepage)
        setDescription(data.description)
        setupdatedAt(data.updated_at)
        setForks(data.forks)
        setStars(data.stars)
        setLanguages(data.languages)
        setIssues(data.latest_open_issues)
        setContributors(data.contributors)
        setLatestRelease(data.latest_release)
        setCommitsPerDay(data.commits_per_day)
        setTopContributors(data.top_contributors)
        setTopicInterests(data.topic_interest)
      }
    })
  }, [data]);
    return (
    <>
      {repoName.length > 2 ? (
        <Dashboard
          id={id}
          repoName={repoName}
          homepage={homepage}
          description={description}
          updatedAt={updatedAt}
          forks={forks}
          stars={stars}
          languages={languages}
          issues={issues}
          contributors={contributors}
          latestRelease={latestRelease}
          commitsPerDay={commitsPerDay}
          topContributors={topContributors}
          topicInterests={topicInterests}
        />
      ):(
        <div className="flex flex-col items-center space-y-5">
          <div className="p-2 space-y-2 space-x-5 flex items-center justify-evenly w-full">
            <Skeleton className="h-[200px] w-[400px] md:h-[150px] md:w-[70%] rounded-xl bg-slate-200" />
          </div>
          <div className="p-2 space-y-2 space-x-5 flex items-center justify-evenly w-full">
            <Skeleton className="h-[200px] w-[400px] md:h-[150px] md:w-[50%] rounded-xl bg-slate-200" />
            <Skeleton className="h-[200px] w-[400px] md:h-[150px] md:w-[50%] rounded-xl bg-slate-200" />
          </div>
          <div className="p-2 space-y-2 space-x-5 flex items-center justify-evenly w-full">
            <Skeleton className="h-[200px] w-[400px] md:h-[100px] md:w-[20%] rounded-xl bg-slate-200" />
            <Skeleton className="h-[200px] w-[400px] md:h-[100px] md:w-[20%] rounded-xl bg-slate-200" />
            <Skeleton className="h-[200px] w-[400px] md:h-[100px] md:w-[20%] rounded-xl bg-slate-200" />
            <Skeleton className="h-[200px] w-[400px] md:h-[100px] md:w-[20%] rounded-xl bg-slate-200" />
            <Skeleton className="h-[200px] w-[400px] md:h-[100px] md:w-[20%] rounded-xl bg-slate-200" />
          </div>
          <div className="p-2 space-y-2 space-x-5 flex items-center justify-evenly w-full">
            <Skeleton className="h-[200px] w-[400px] md:h-[600px] md:w-[50%] rounded-xl bg-slate-200" />
            <Skeleton className="h-[200px] w-[400px] md:h-[600px] md:w-[50%] rounded-xl bg-slate-200" />
          </div>
        </div>
      )}
    </>
  )
}
export default RepoPage