'use client'

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs"
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const {user} = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="font-[500] tracking-[0.3rem] text-[40px]">
          {`${user?.firstName} `}
          is checking engagements
        </h1>
      )}

      <Breadcrumbs />

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </div>
  )
}
export default Header