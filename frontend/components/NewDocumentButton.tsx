'use client'

import { useTransition } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async() => {
      const { id } = await createNewDocument("rohanrepo");
      router.push(`/repo/${id}`);
    })
  }

  return (
    <Button 
      onClick={handleCreateNewDocument}
      disabled={isPending}
    >
      {isPending ? "Creating.." : "Add New Repo"}
    </Button>
  )
}
export default NewDocumentButton