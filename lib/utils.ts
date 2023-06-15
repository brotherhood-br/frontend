import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNameInitials(name: string) {
  const words = name.split(" ")
  const initials = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
  return initials
}
