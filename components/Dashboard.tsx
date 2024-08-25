'use client'

import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
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
  UsersIcon,
  GitPullRequestArrowIcon,
  TagIcon,
  UserIcon
} from "lucide-react";
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { AreaChart, type EventProps } from '@tremor/react'

const chartConfig = {
  commits: {
    label: "Commits",
    color: "#b9b9b9",
  },
} satisfies ChartConfig

const chartConfigContributor = {
  commits: {
    label: "Commits",
    color: "#b9b9b9",
  },
} satisfies ChartConfig


interface Language {
  language: string;
  loc: number;
}

interface Issue {
  issue: string;
  href: string;
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

interface Props {
  id: string;
  repoName: string;
  homepage: string;
  description: string;
  updatedAt: string;
  forks: number | undefined;
  stars: number | undefined;
  languages: Language[];
  issues: Issue[];
  contributors: number | undefined;
  latestRelease: string;
  commitsPerDay: Commit[];
  topContributors: TopContributor[];
  topicInterests: TopicInterest[];
}

interface CalculatePercentage {
  (num: number): number | undefined;
}

function Dashboard({
    id,
    repoName, 
    homepage, 
    description,
    updatedAt,
    forks,
    stars,
    languages,
    issues,
    contributors,
    latestRelease,
    commitsPerDay,
    topContributors,
    topicInterests
} : Props) {

  const [total, setTotal] = useState<number | undefined>();

  const [value, setValue] = useState<null | EventProps>(null)

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

      <div className="flex flex-col md:flex-row space-y-2 items-center justify-evenly p-5 w-full">
        <div></div>

        <div className="border border-gray-400 p-4 rounded-xl flex items-center">
          <ComponentIcon className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {description}
          </h1>
        </div>

        <div className="border border-gray-400 p-4 rounded-xl flex items-center">
          <CompassIcon className="mr-4 size-[45px]"/>

          <Link href={homepage} className="capitalize hover:animate-pulse tracking-[0.2rem] text-[25px] font-[550]">
            {`Learn More About ${repoName}`}
          </Link>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row justify-evenly p-5 w-full space-y-5">
        <div></div>
        
        <div className="flex items-center border border-gray-400 p-4 rounded-xl min-w-[300px] justify-center">
          <Star className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {stars}
          </h1>
        </div>

        <div className="flex items-center border border-gray-400 p-4 rounded-xl min-w-[300px] justify-center">
          <GitFork className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {forks}
          </h1>
        </div>

        <div className="flex items-center border border-gray-400 p-4 rounded-xl min-w-[300px] justify-center">
          <UsersIcon className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {contributors}
          </h1>
        </div>

        <div className="flex items-center border border-gray-400 p-4 rounded-xl min-w-[300px] justify-center">
          <TagIcon className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550] truncate max-w-[350px]">
            {latestRelease}
          </h1>
        </div>

        <div className="flex items-center border border-gray-400 p-4 rounded-xl min-w-[300px] justify-center">
          <CalendarDays className="mr-4 size-[45px]" />

          <h1 className="tracking-[0.2rem] text-[25px] font-[550]">
            {updatedAt}
          </h1>
        </div>
      </div>

      <div className="flex flex-col space-y-5 md:flex-row space-x-2 justify-evenly">
        <div></div>
        
        <div className="space-y-10 flex flex-col border border-gray-400 rounded-xl flex-[0.5] p-1">
          <h1 className="text-center tracking-[0.2rem] text-[25px] font-[550] mt-10">
            Languages Used
          </h1>

          <div className="flex items-center flex-wrap w-full">
            {languages.map(item => {
              let progressValue = calculatePercentage(item.loc) 
              if (progressValue) {
                progressValue = progressValue + 8
              }
              return (
                <div className="border border-gray-300 p-3 rounded-xl m-2 min-w-[180px] odd:bg-gray-100 even:bg-gray-200">
                  <p className="tracking-[0.1rem] text-[15px] font-[550]">{item.language}</p>
                  <Progress value={progressValue} className="w-[100%] border" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-2 flex flex-col border border-gray-400 p-3 rounded-xl flex-[0.5] max-h-[600px] overflow-y-scroll">
          <h1 className="capitalize text-center tracking-[0.2rem] text-[25px] font-[550]">
            latest open PR's
          </h1>

          <div className="space-y-2 ">
            {issues.map(item => (
              <Link href={item.href} className="flex items-center justify-between odd:bg-gray-100 even:bg-gray-200 p-1 hover:opacity-60">
                <div className="flex items-center">
                  <GitPullRequestArrowIcon className="mr-2 size-[25px]"/>
                  
                  <p className="tracking-[0.1rem] text-[15px] font-[550] ml-2 truncate max-w-[750px]">
                    {item.issue}
                  </p>
                </div>

                <div className="flex items-center justify-start w-[200px]">
                  <UserIcon className="mr-2 size-[25px]" />

                  <p>{item.user}</p>
                </div>
                </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-5 items-center justify-evenly space-x-2 w-full">
        <div></div>

        <div className="border border-gray-400 px-1 py-4 rounded-xl flex-[0.5]">
          <h1 className="text-center tracking-[0.2rem] text-[25px] font-[550] capitalize">
            Number of commits for last {commitsPerDay.length} days
          </h1>

          <ChartContainer config={chartConfig} className="min-h-[500px] w-full">
            <BarChart accessibilityLayer data={commitsPerDay}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="commits" fill="var(--color-commits)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        
        <div className="border border-gray-400 p-4 rounded-xl flex-[0.5]">
          <h1 className="text-center tracking-[0.2rem] text-[25px] font-[550] capitalize">
            Top {topContributors.length} contributors
          </h1>
          
          <ChartContainer config={chartConfigContributor} className="min-h-[500px] w-full">
            <BarChart accessibilityLayer data={topContributors}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="author"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 10)}
                // angle={45}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="commits" fill="var(--color-commits)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="space-y-10 flex flex-col border border-gray-400 rounded-xl p-4 min-w-[50%] h-[30%]">
        <h1 className="text-center tracking-[0.2rem] text-[25px] font-[550] capitalize">
          Interest over time for last {topicInterests.length} days
        </h1>

        <AreaChart
          className='mt-4 h-80'
          data={topicInterests}
          index="date"
          categories={['popularity']}
          onValueChange={(v: EventProps) => setValue(v)}
          // colors={["red"]}
        />

      </div>

      <AlertDialog>
            <AlertDialogTrigger>
              <Button className="text-[24px] p-8 w-[300px] tracking-[0.2rem]">Delete Dashboard</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[30px]">Are you absolutely sure ?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-[20px]">Cancel</AlertDialogCancel>
                <AlertDialogAction className="text-[20px]" onClick={deleteRepo}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}
export default Dashboard

