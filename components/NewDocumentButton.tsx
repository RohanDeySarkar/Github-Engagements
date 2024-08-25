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
import { Skeleton } from "@/components/ui/skeleton"

function NewDocumentButton() {
  // const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState<boolean>(false);
  const [create, setCreate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const router = useRouter();

  const handleCreateNewDocument = async() => {    
    setCreate(true)
    if (name.length > 2){
      try {
        const { id } = await createNewDocument(name);
        router.push(`/repo/${id}`);
      } catch (err) {
        alert("NOT A REPO!")
        router.push(`/`);
      }
    }
    setOpen(false);
    setName("");
    setCreate(false);

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
        className="text-[24px] p-8 w-[300px] tracking-[0.2rem]"
      >
        {open ? "Adding.." : "Add New Repo"}
      </Button>

      <Dialog open={open}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-[30px]">Repository Name</DialogTitle>
            <DialogDescription className="text-[24px]">
              Enter the full repo name from github to see visualizations
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {create ? (
                <Skeleton className="h-8 w-[480px]" />
              ):(
                <>
                <Label htmlFor="name" className="text-right text-[20px]">
                  Name
                </Label>
                <Input
                  id={name}
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
                </>
              )}
            </div>
          </div>
          
            <Button 
              type="submit" 
              onClick={handleCreateNewDocument}
              disabled={create}
              className="text-[20px]"
            >
              {create ? "Creating..." : "Create"}
            </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default NewDocumentButton