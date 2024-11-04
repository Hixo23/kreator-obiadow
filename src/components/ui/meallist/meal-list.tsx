"use client";

import Link from "next/link"
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react"

export const MealList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full px-4 flex flex-col gap-2">
      <p onClick={() => setIsOpen(!isOpen)} className="font-semibold cursor-pointer flex justify-between px-1">Posilki {isOpen ? <ChevronDown /> : <ChevronRight />}</p>
      {isOpen && (
        <nav className="ml-4 flex flex-col gap-2">
          <Link className="hover:font-black ease-in-out duration-150 transition-all" href="/">Sniadanie</Link>
          <Link className="hover:font-black ease-in-out duration-150 transition-all" href="/">Obiady</Link>
          <Link className="hover:font-black ease-in-out duration-150 transition-all" href="/">Kolacje</Link>
        </nav>
      )}
    </div>
  )
}
