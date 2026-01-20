"use client";

import { usePathname } from "next/navigation";
import { pageUrl } from "@/constants/routing";

type PageUrlValue = (typeof pageUrl)[keyof typeof pageUrl];

const pageTitles: Record<PageUrlValue, string> = {
  [pageUrl.home]: "Portfolio",
  [pageUrl.secondPage]: "Second Page",
};

export const PageTitle = () => {
  const pathname = usePathname();
  const title = pageTitles[pathname as PageUrlValue] ?? "Portfolio";

  return <h1 className="pl-2 text-sm">{title}</h1>;
};
