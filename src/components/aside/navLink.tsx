"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "block py-[0.5625rem] px-2 text-xs transition-colors border-l",
        isActive
          ? "border-reya-athens-gray text-reya-athens-gray"
          : "border-transparent text-reya-gray hover:text-reya-athens-gray",
      )}
    >
      {children}
    </Link>
  );
};
