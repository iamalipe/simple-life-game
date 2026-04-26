import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v6 as uuidv6 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUUID() {
  return uuidv6();
}
