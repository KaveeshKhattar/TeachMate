"use client";
import { Button } from "../../components/ui/button";
import { ModeToggle } from "../../components/modeToggle";
import Link from "next/link";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Hamburger() {
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();

  const fetchRole = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/check-role/?userClerkId=${user?.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch role: ${response.statusText}`);
      }
      const data = await response.json();
      setRole(data.role);
    } catch (error) {
      console.error("Error fetching role:", error);
      return null;
    }
  };

  fetchRole();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Closes the menu
  };

  return (
    <nav className="flex m-2 items-center w-full">
      {/* Wrapper for all content */}

      <div className="flex items-center justify-between w-full">
        {/* Left Section with Logo */}
        <div className="flex items-center">
          <button
            className="z-50 text-sm px-3 py-2 mr-2 md:hidden rounded-md dark:bg-black dark:text-white"
            onClick={toggleMenu}
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
          <h2>
            <Link href="/">
              <span className="text-2xl font-bold text-black dark:text-white mt-2">
                TeachMate
              </span>
            </Link>
          </h2>
        </div>

        {/* Centered Links for Medium and Above */}

        {/* Right Section with Profile/Sign In Links */}
        <div className="flex items-center space-x-2">
          <ModeToggle />

          <SignedIn>
            <div className="flex p-2">
              <UserButton />
            </div>
          </SignedIn>

          <div className="hidden md:flex space-x-2">
            <SignedOut>
              <SignInButton>
                <Button
                  className="w-1/3"
                  variant="secondary"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  className="w-1/3"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div
        className={`md:hidden fixed mr-2 top-0 left-0 w-full h-screen bg-white dark:bg-black flex flex-col items-center justify-center space-y-8 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SignedIn>
          <div className="flex flex-col p-2 w-full space-y-4">
            <SignOutButton>
              <Button
                variant="destructive"
                onClick={() => {
                  closeMenu();
                }}
              >
                Sign Out
              </Button>
            </SignOutButton>

            <Link href={"/additional-info"}>
              <Button
                variant="outline"
                className=" w-full"
                onClick={() => {
                  closeMenu();
                }}
              >
                Account
              </Button>
            </Link>

            {role === "STUDENT" && (
              <Button
                onClick={() => {
                  closeMenu();
                }}
              >
                <Link href={"/student"}>Student Dashboard</Link>
              </Button>
            )}

            {role === "TEACHER" && (
              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  <Link href={"/teacher"}>Teacher Dashboard</Link>
                </Button>
                <Button
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  <Link href={"/attendance"}>Attendance</Link>
                </Button>
                <Button
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  <Link href={"/payments"}>Payments</Link>
                </Button>
              </div>
            )}
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button
              className="w-1/3"
              onClick={() => {
                closeMenu();
              }}
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button
              className="w-1/3"
              variant="secondary"
              onClick={() => {
                closeMenu();
              }}
            >
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
}
