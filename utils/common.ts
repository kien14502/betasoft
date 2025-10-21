import {
  ResponseOrgMember,
  ResponseProjectsWithProjectMemberRole,
} from '@/app/api/generated.schemas';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GroupMembers = {
  startChar: string;
  members: ResponseOrgMember[];
};

export function detectStartCharMembers(members: ResponseOrgMember[]): GroupMembers[] {
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

type GroupedProjects = {
  adminProjects: ResponseProjectsWithProjectMemberRole[];
  otherProjects: ResponseProjectsWithProjectMemberRole[];
};

export function groupRoleProjects(projects: ResponseProjectsWithProjectMemberRole[]) {
  const group = projects.reduce<GroupedProjects>(
    (acc, proj) => {
      if (proj.role === 'admin') {
        acc.adminProjects.push(proj);
      } else {
        acc.otherProjects.push(proj);
      }
      return acc;
    },
    { adminProjects: [], otherProjects: [] },
  );
  return group;
}
