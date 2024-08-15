'use client'

function RepoPage({params : {id}} : {params:{id:string}}) {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      RepoPage: {id}
      {/* fetch repo based on id and create graphs */}
      {/* fetch data from user/useremai/github_repos/{id} and plot */}
    </div>
  )
}
export default RepoPage