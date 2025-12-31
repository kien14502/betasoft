import {
  ModelsTaskListBasic,
  RequestCreateLabelDataToCreate,
  RequestCreateSprintRequest,
  ResponseMembersWithProjectMemberRole,
  ResponseOrgMember,
} from '@/app/api/generated.schemas';
import { clsx, type ClassValue } from 'clsx';
import { UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { showToast } from './toast';
import { ProjectData } from '@/interface/task';
import { CHAT_TYPE } from '@/constants/common';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trimBody = (body: object | undefined): object | undefined => {
  if (body === undefined || body === null || typeof body !== 'object') {
    return body;
  }

  // Use a type assertion to iterate over the object keys
  const trimmed: { [key: string]: unknown } = {};

  for (const [key, value] of Object.entries(body)) {
    // 1. Skip properties with null or undefined values
    if (value === null || value === undefined) {
      continue;
    }

    // 2. Handle object/array recursion
    if (typeof value === 'object') {
      const trimmedValue = trimBody(value);

      // Only include the property if the trimmed object/array is not empty
      if (Object.keys(trimmedValue as object).length > 0) {
        trimmed[key] = trimmedValue;
      }
      continue;
    }

    // 3. Handle string cleaning (trim and check for emptiness)
    if (typeof value === 'string') {
      const trimmedString = value.trim();
      if (trimmedString.length > 0) {
        trimmed[key] = trimmedString;
      }
      continue;
    }

    if (Array.isArray(value)) {
      const trimmedArray = trimBody(value);
      trimmed[key] = trimmedArray;
    }

    // 4. Include all other primitive values (numbers, booleans, etc.)
    trimmed[key] = value;
  }

  return trimmed;
};

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
  adminProjects: ProjectData[];
  otherProjects: ProjectData[];
};

export function groupRoleProjects(projects: ProjectData[]) {
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
  const rs = Object.entries(enumObj).map(([key, value]) => ({
    label: key,
    value: value.toString(),
  }));
  return rs;
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
    name: 'Sprint 1',
    begin_at: '2025-01-01T00:00:00Z',
    end_at: '2026-01-14T23:59:59Z',
    is_active: true,
    goal: 'Initial sprint setup',
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFormReady = (form: UseFormReturn<any>) => {
  const isActive = !form.formState.isValid || form.formState.isSubmitting;
  return isActive;
};

export function encodeBase64(text: string) {
  const buffer = Buffer.from(text, 'utf8');

  const base64String = buffer.toString('base64');

  return base64String;
}

export function decodeBase64(base64String: string) {
  const buffer = Buffer.from(base64String, 'base64');

  const decodedText = buffer.toString('utf8');

  return decodedText;
}

export const commingSoonToast = () => showToast('🚧 This feature is coming soon! 🚧', 'info');

export const COLORS = [
  '#7DD3FC',
  '#38BDF8',
  '#0EA5E9',
  '#14B8A6',
  '#22C55E',
  '#16A34A',
  '#EF4444',
  '#F472B6',
  '#E879F9',
  '#A855F7',
  '#C4B5FD',
  '#E9D5FF',
  '#FB923C',
  '#FBBF24',
];

export const verifyChatType = (type: string) => {
  const objs = Object.values(CHAT_TYPE).find((key) => key === type);
  return objs ? objs : null;
};
