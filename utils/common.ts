import {
  ModelsTaskListBasic,
  RequestCreateLabelDataToCreate,
  RequestCreateSprintRequest,
  ResponseMembersWithProjectMemberRole,
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

export const getColorProject = (prjs: ModelsTaskListBasic[], id: string) =>
  prjs.find((item) => item.id === id)?.color;

export const getAvatarMember = (members: ResponseMembersWithProjectMemberRole[], id: string) => {
  const avatar = members.find((item) => item.member?.id === id)?.member?.profile_image;
  return avatar ?? '/icons/user-circle.svg';
};

export const fEnumToArray = (enumObj: Record<string, string | number>) => {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: key,
    value: value.toString(),
  }));
};

export const labels: RequestCreateLabelDataToCreate[] = [
  {
    name: 'Bug',
    description: 'Issues that need to be fixed',
    color: '#D73A49',
    project_id: '',
  },
];

export const sprints: RequestCreateSprintRequest[] = [
  {
    begin_at: '1',
    end_at: '2',
    name: 'test',
    is_active: true,
    goal: 'done',
  },
];

type RGB = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

/**
 * Convert HEX → RGB(A)
 */
export function hexToRGB(hex: string): RGB {
  // Remove #
  hex = hex.replace(/^#/, '');

  // Expand short form (#abc → #aabbcc)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  // Handle #RRGGBBAA (8-digit hex)
  if (hex.length === 8) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const a = parseInt(hex.substring(6, 8), 16) / 255;
    return { r, g, b, a };
  }

  // Standard #RRGGBB
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }

  throw new Error('Invalid HEX color format');
}
