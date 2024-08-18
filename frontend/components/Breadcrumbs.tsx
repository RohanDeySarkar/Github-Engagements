'use client'

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb" 
import { Fragment } from "react";


function Breadcrumbs() {
    const path = usePathname();
    const segments = path.split("/");
    
  return (
    <Breadcrumb className=" w-[50%] grid text-center"> 
        <BreadcrumbList className="tracking-[0.1rem] text-[25px]">
            <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, index) => {
                if (!segment) return null;

                const href = `/${segments.slice(0, index + 1).join("/")}`;
                const isLast = index === segments.length - 1;
                const isSecondLast = index === segments.length - 2;
                const notLink = isLast || isSecondLast

                return (
                    <Fragment key={segment}>
                        <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        {notLink ? (
                            <BreadcrumbPage>{segment}</BreadcrumbPage>
                        ):(
                            <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                        )}
                        
                    </BreadcrumbItem>
                    </Fragment>
                )
            })}
        </BreadcrumbList>
    </Breadcrumb>

  )
}
export default Breadcrumbs