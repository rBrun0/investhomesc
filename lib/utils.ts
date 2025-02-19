import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum Roles {
  ADMIN = "admin",
  CORRETOR = "corretor",
  COMUM = "comum",
}

export const isObjectFullyEmpty = (filters: Record<string, any>): boolean => {
  return Object.values(filters).every(value => !value || (Array.isArray(value) && value.length === 0));
};
