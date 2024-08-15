'use client'

import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function NewDocumentButton() {
  // const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const router = useRouter();

  const handleCreateNewDocument = async() => {
    if (name.length > 2){
      const { id } = await createNewDocument(name);
      router.push(`/repo/${id}`);
    }
    setOpen(false);

    // startTransition(async() => {
      
    //   // const { id } = await createNewDocument("rohanrepo");
    //   // router.push(`/repo/${id}`);
    // })
  }

  return (
    <div>
      <Button 
        onClick={() => setOpen(true)}
        disabled={open}
      >
        {open ? "Creating.." : "Add New Repo"}
      </Button>

      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Repository Name</DialogTitle>
            <DialogDescription>
              Enter the full repo name from github to see visualizations
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id={name}
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
            <Button type="submit" onClick={handleCreateNewDocument}>Enter</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default NewDocumentButton