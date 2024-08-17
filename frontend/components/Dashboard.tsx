'use client'

import Link from "next/link"

import { 
  ComponentIcon, 
  CompassIcon,
  CalendarDays,
  GitFork,
  Star
} from "lucide-react";
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";

interface Language {
  language: string;
  loc: number;
}

interface Props {
    repoName: string;
    homepage: string;
    description: string;
    createdAt: string;
    forks: number | undefined;
    stars: number | undefined;
    languages: Language[]
}

interface CalculatePercentage {
  (num: number): number | undefined;
}

function Dashboard({
    repoName, 
    homepage, 
    description,
    createdAt,
    forks,
    stars,
    languages
} : Props) {

  // console.log(languages)

  const [total, setTotal] = useState<number | undefined>()

  useEffect(() => {
    let sum = 0;
    for(let i=0; i<languages.length; i++) {
      sum += languages[i].loc
    }
    setTotal(sum)
  }, [])

  const calculatePercentage: CalculatePercentage = (num) => {
    if (!total) return;
    return (num / total) * 100 
  }

  return (
    <div className=" flex flex-col items-center space-y-5 min-h-screen">
      <h1 className="capitalize font-extrabold text-xl tracking-widest p-5">
        {repoName}
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-evenly p-5 w-full">
        <div className="border border-gray-400 p-4 rounded-md flex items-center">
          <ComponentIcon className="mr-4" />

          <h1 className="">
            {description}
          </h1>
        </div>

        <div className="border border-gray-400 p-4 rounded-md flex items-center">
          <CompassIcon className="mr-4"/>

          <Link href={homepage} className="hover:animate-pulse">
            {`Explore ${repoName}`}
          </Link>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row justify-evenly p-5 w-full">
        <div className="flex items-center border border-gray-400 p-4 rounded-md">
          <Star className="mr-4" />

          <h1>{stars}</h1>
        </div>

        <div className="flex items-center border border-gray-400 p-4 rounded-md">
          <GitFork className="mr-4" />

          <h1>{forks}</h1>
        </div>

        <div className="flex items-center border border-gray-400 p-4 rounded-md">
          <CalendarDays className="mr-4" />

          <h1>{createdAt}</h1>
        </div>
      </div>

      <div className="flex">
        <div className="flex items-center flex-wrap w-2/4 bg-slate-300">
          {languages.map(item => {
            let progressValue = calculatePercentage(item.loc) 
            if (progressValue) {
              progressValue = progressValue + 5
            }
            return (
              <div className="border border-gray-400 p-2 rounded-xl m-2 min-w-[100px]">
                <p>{item.language}</p>
                <Progress value={progressValue} className="w-[100%] border" />
              </div>
            )
          })}
        </div>

        <div>
          <p>open issues</p>
        </div>
      </div>

      <div>
        {/* releases */}
      </div>

      <div>
        {/* delete  */}
      </div>
    </div>
  )
}
export default Dashboard

