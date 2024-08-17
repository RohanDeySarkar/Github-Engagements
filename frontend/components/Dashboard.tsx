'use client'

import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { 
  ComponentIcon, 
  CompassIcon,
  CalendarDays,
  GitFork,
  Star,
  MinusIcon
} from "lucide-react";
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


interface Language {
  language: string;
  loc: number;
}

interface Issue {
  issue: string;
}

interface Props {
  id: string;
  repoName: string;
  homepage: string;
  description: string;
  createdAt: string;
  forks: number | undefined;
  stars: number | undefined;
  languages: Language[];
  issues: Issue[];
}

interface CalculatePercentage {
  (num: number): number | undefined;
}


function Dashboard({
    id,
    repoName, 
    homepage, 
    description,
    createdAt,
    forks,
    stars,
    languages,
    issues
} : Props) {

  // console.log(languages)

  const [total, setTotal] = useState<number | undefined>();

  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    let sum = 0;
    for(let i=0; i<languages.length; i++) {
      sum += languages[i].loc
    }
    setTotal(sum)
  }, []);

  const calculatePercentage: CalculatePercentage = (num) => {
    if (!total) return;
    return (num / total) * 100 
  };

  const deleteRepo = async() => {
    const docRef = doc(db, `users/${user?.emailAddresses}/repos`, id);
    await deleteDoc(docRef);
    router.push("/");
  };

  return (
    <div className=" flex flex-col items-center space-y-5 min-h-screen">
      <h1 className="uppercase font-[750] tracking-[1rem] p-5 text-[54px] border-[2px] border-gray-400 rounded-xl">
        {repoName}
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between p-5 w-full">
        <div className="border border-gray-400 p-4 rounded-md flex items-center">
          <ComponentIcon className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {description}
          </h1>
        </div>

        <div className="border border-gray-400 p-4 rounded-md flex items-center">
          <CompassIcon className="mr-4 size-[45px]"/>

          <Link href={homepage} className="capitalize hover:animate-pulse tracking-[0.2rem] text-[25px] font-[550]">
            {`Learn More About ${repoName}`}
          </Link>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row justify-evenly p-5 w-full">
        <div className="flex items-center border border-gray-400 p-4 rounded-md">
          <Star className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {stars}
          </h1>
        </div>

        <div className="flex items-center border border-gray-400 p-4 rounded-md">
          <GitFork className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {forks}
          </h1>
        </div>

        <div className="flex items-center border border-gray-400 p-4 rounded-md">
          <CalendarDays className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {createdAt}
          </h1>
        </div>
      </div>

      <div className="flex space-x-2 justify-evenly">
        <div className="space-y-2 grid items-center border border-gray-400 p-3 rounded-xl flex-[0.5]">
          <h1 className="text-center tracking-[0.2rem] text-[25px] font-[550]">Languages Used</h1>

          <div className="flex items-center flex-wrap w-full">
            {languages.map(item => {
              let progressValue = calculatePercentage(item.loc) 
              if (progressValue) {
                progressValue = progressValue + 8
              }
              return (
                <div className="border border-gray-300 p-3 rounded-xl m-2 min-w-[180px]">
                  <p className="tracking-[0.1rem] text-[15px] font-[550]">{item.language}</p>
                  <Progress value={progressValue} className="w-[100%] border" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-2 border border-gray-400 p-3 rounded-xl flex-[0.4]">
          <h1 className="capitalize text-center tracking-[0.2rem] text-[25px] font-[550]">top open issues</h1>

          <div className="space-y-2">
            {issues.map(item => (
              <div className="flex items-center">
                <MinusIcon className=""/>
                <p className="tracking-[0.1rem] text-[15px] font-[550] ml-2">
                  {item.issue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        {/* releases */}
      </div>

      {/* <Button 
        onClick={deleteRepo}
        className="text-[24px] p-8 w-[300px] tracking-[0.2rem]"
      >
        Delete
      </Button> */}

      <AlertDialog>
            <AlertDialogTrigger>
              <Button className="text-[24px] p-8 w-[300px] tracking-[0.2rem]">Delete Dashboard</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteRepo}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}
export default Dashboard

