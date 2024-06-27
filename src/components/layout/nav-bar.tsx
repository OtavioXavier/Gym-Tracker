"use client";

import { SignOutButton, UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "../search-Input";
import { ToggleTheme } from "./../theme.toggle";
import {
  Dumbbell,
  LayoutDashboard,
  NotebookPen,
  BicepsFlexed,
  LogOut,
} from "lucide-react";
import { clsx } from "clsx";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Workout", href: "/workout", icon: Dumbbell },
  { name: "Plans", href: "/plans", icon: NotebookPen },
  { name: "Exercises", href: "/exercises", icon: BicepsFlexed },
];

export default function NavBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  return (
    <section>
      <header className="flex flex-1 items-center p-4 justify-between border border-slate-500/30">
        <div className="flex items-center gap-12">
          <Link
            className="flex gap-2 items-center cursor-pointer mr-12 hover:scale-105 transition-all"
            href={"/"}
          >
            <Image
              src={"/logo.svg"}
              width={35}
              height={35}
              alt="Logo Gym Tracker"
            />
            <h1 className="uppercase text-xl font-bold">GymTracker</h1>
          </Link>
          <SearchInput />
        </div>
        <div className="flex justify-between items-center gap-4">
          <ToggleTheme />
          <UserButton afterSignOutUrl="/" />
          {!userId && (
            <>
              <Button
                onClick={() => router.push("/sign-in")}
                variant="outline"
                size="sm"
              >
                Sign in
              </Button>
              <Button onClick={() => router.push("/sign-up")} size="sm">
                Sign up
              </Button>
            </>
          )}
        </div>
      </header>
      <section className="flex">
        <aside className="border border-slate-500/30 w-[4rem] md:w-[17rem] min-h-screen  border-t-0 flex flex-col justify-between">
          <ul>
            {links.map((link) => {
              const LinkIcon = link.icon;
              const isActive = pathName.includes(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-slate-500 flex items-center h-9 ml-4 mt-2 mb-8 justify-between hover:scale-105 transition-all",
                      {
                        "text-red-500": isActive,
                      }
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <LinkIcon
                        className={clsx("w-6", { "text-red-500": isActive })}
                      />
                      <p
                        className={clsx("text-lg hidden md:block", {
                          "text-red-500": isActive,
                        })}
                      >
                        {link.name}
                      </p>
                    </div>
                    <span
                      className={clsx("w-1 h-9 rounded-full hidden md:block", {
                        "bg-red-400": isActive,
                      })}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <SignOutButton redirectUrl="/">
            <button className="flex items-center w-[2rem] md:w-60 h-9 ml-4 mt-2 mb-8 text-slate-500 gap-4">
              <LogOut />
              <span className="hidden md:block">Sign Out</span>
            </button>
          </SignOutButton>
        </aside>
        <main className="grow m-8">{children}</main>
      </section>
    </section>
  );
}
