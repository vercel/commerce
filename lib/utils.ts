import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
}

export function ensureStartsWith(stringToCheck: string, startsWith: string) {
  if (!stringToCheck || typeof stringToCheck !== "string") {
    return stringToCheck;
  }

  if (stringToCheck.startsWith(startsWith)) {
    return stringToCheck;
  }

  return `${startsWith}${stringToCheck}`;
}

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables: Record<string, string | undefined> = {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  };

  const missingEnvironmentVariables = Object.entries(
    requiredEnvironmentVariables
  )
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `Missing required environment variables: ${missingEnvironmentVariables.join(", ")}`
    );
  }
};
