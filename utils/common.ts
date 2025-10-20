import { ResponseOrgMember } from '@/app/api/generated.schemas';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Test = {
  startChar: string;
  members: ResponseOrgMember[];
};

export function detectStartCharMembers(members: ResponseOrgMember[]): Test[] {
  if (!members || members.length === 0) return [];

  const sortedMembers = [...members].sort((a, b) =>
    (a.full_name ?? '').localeCompare(b.full_name ?? ''),
  );

  const groupedMembers = sortedMembers.reduce(
    (acc: Record<string, ResponseOrgMember[]>, member) => {
      const startChar = (member.full_name ?? '').charAt(0).toUpperCase();

      if (!acc[startChar]) {
        acc[startChar] = [];
      }

      acc[startChar].push(member);

      return acc;
    },
    {},
  );

  return Object.keys(groupedMembers).map((char) => ({
    startChar: char,
    members: groupedMembers[char],
  }));
}
