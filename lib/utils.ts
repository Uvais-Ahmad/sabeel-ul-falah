import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// Sample function to merge classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
