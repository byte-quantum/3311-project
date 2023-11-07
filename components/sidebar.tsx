"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  ChartPieIcon,
  HomeIcon,
  XMarkIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Budgeting", href: "/budgeting", icon: ChartPieIcon },
  {
    name: "Savings",
    href: "/savings",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Financial Education",
    href: "/education",
    icon: BookOpenIcon,
  },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session:", session);
  }, [session]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 ring-1 ring-white/10 bg-slate-950">
                    <div className="flex items-center pt-4">
                      <span className="text-2xl font-bold text-green-700">
                        Dorm Dollars
                      </span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={cn(
                                    item.href === pathname
                                      ? "bg-slate-900 text-green-500"
                                      : "text-white hover:text-green-500 hover:bg-slate-900",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
                          </div>
                        </Dialog>
                      </Transition.Root>

                      {/* Static sidebar for desktop */}
                      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 border-r border-slate-800 bg-gray-900">
                          <div className="flex items-center pt-4">
                            <span className="text-2xl font-bold text-green-700">
                              Dorm Dollars
                            </span>
                          </div>
                          <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                              <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                  {navigation.map((item) => (
                                    <li key={item.name}>
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          item.href === pathname
                                            ? "bg-slate-900 text-green-500"
                                            : "text-white hover:text-green-500 hover:bg-slate-900",
                                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                        )}
                                      >
                                        <item.icon
                                          className="h-6 w-6 shrink-0"
                                          aria-hidden="true"
                                        />
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                              <li>
                                <div className="text-xs font-semibold leading-6 text-gray-400">
                                  Your accounts
                                </div>
                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                  {teams.map((team) => (
                                    <li key={team.name}>
                                      <a
                                        href={team.href}
                                        className={classNames(
                                          team.href === pathname
                                            ? "bg-slate-900 text-green-500"
                                            : "text-white hover:text-green-500 hover:bg-slate-900",
                                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                        )}
                                      >
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-[#020617]">
                                          {team.initial}
                                        </span>
                                        <span className="truncate">{team.name}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                              <li className="-mx-6 mt-auto">
                                {session ? (
                                  <a
                                    href="#"
                                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 hover:bg-slate-900 text-slate-900"
                                  >
                                    <img
                                      className="h-8 w-8 rounded-full bg-gray-800"
                                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                      alt=""
                                    />
                                    <span className="sr-only">Your profile</span>
                                    <span aria-hidden="true" className="text-white">
                                      Nicholas Moreland
                                    </span>
                                  </a>
                                ) : (
                                  <div className="flex flex-row space-x-2 p-2">
                                    <Button asChild className="w-full">
                                      <Link href="/signup">Sign up</Link>
                                    </Button>
                                    <Button asChild className="w-full">
                                      <Link href="/login">Log in</Link>
                                    </Button>
                                  </div>
                                )}
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 border-r border-slate-800">
            <div className="flex items-center pt-4">
              <span className="text-2xl font-bold text-green-700">
                Dorm Dollars
              </span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={cn(
                            item.href === pathname
                              ? "bg-slate-900 text-green-500"
                              : "text-white hover:text-green-500 hover:bg-slate-900",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                      <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-slate-900">
                        <button
                          type="button"
                          className="-m-2.5 p-2.5 text-white lg:hidden"
                          onClick={() => setSidebarOpen(true)}
                        >
                          <span className="sr-only">Open sidebar</span>
                          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 text-sm font-semibold leading-6 text-white">
                          Dashboard
                        </div>
                        <a href="#">
                          <span className="sr-only">Your profile</span>
                          <img
                            className="h-8 w-8 rounded-full bg-gray-800"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  {status === "authenticated" ? (
                    <div className="flex items-center space-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white">
                      <Avatar className="h-10 w-10 text-slate-950">
                        <AvatarImage
                          src={session.user?.image as string}
                          referrerPolicy="no-referrer"
                        />
                        <AvatarFallback>
                          {session.user?.username?.at(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span aria-hidden="true">{session.user?.username}</span>

                      <div className="flex-grow"></div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="ml-auto text-white hover:text-white bg-slate-950 hover:bg-slate-900 border-slate-900"
                          >
                            <ChevronUpIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                              Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              Settings
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onSelect={() => signOut()}
                            >
                              Sign out
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 p-2">
                      <Button asChild className="w-full" variant="secondary">
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button asChild className="w-full" variant="secondary">
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-slate-900">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
            Dashboard
          </div>
          {status === "authenticated" ? (
            <div className="flex items-center space-x-4 text-sm font-semibold leading-6 text-white">
              <Avatar className="h-10 w-10 text-slate-950">
                <AvatarImage
                  src={session.user?.image as string}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  {session.user?.username?.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span aria-hidden="true">{session.user?.username}</span>

              <div className="flex-grow"></div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-auto text-white hover:text-white bg-slate-950 hover:bg-slate-900 border-slate-900"
                  >
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-row space-x-2 items-center">
              <Button asChild className="w-full" variant="secondary">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="w-full" variant="secondary">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
