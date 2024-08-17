'use client'

interface Props {
    repoName: string;
    homepage: string;
    description: string;
    createdAt: string;
    forks: number | undefined;
    stars: number | undefined;
}

function Dashboard({
    repoName, 
    homepage, 
    description,
    createdAt,
    forks,
    stars
} : Props) {
  return (
    <div>
        <h2>{repoName}</h2>
        <h2>{description}</h2>
        <h2>{createdAt}</h2>
        <h2>{forks}</h2>
        <h2>{stars}</h2>
    </div>
  )
}
export default Dashboard