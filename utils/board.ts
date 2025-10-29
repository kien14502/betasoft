import { ResponseTaskListResponse, ResponseTaskResponse } from '@/app/api/generated.schemas';

export type BoardSections = {
  [id: string]: ResponseTaskResponse[];
};

export const getBoardSections = (sections: ResponseTaskListResponse[]) => {
  const sectionObj: { [name: string]: string } = {};
  sections.forEach((rs: ResponseTaskListResponse) => {
    if (!rs || typeof rs.name !== 'string') return;
    sectionObj[rs.id ?? ''] = rs.name;
  });
  return sectionObj;
};

export const getTasksByStatus = (tasks: ResponseTaskResponse[], list_id: string) => {
  return tasks.filter((task) => task.list_id === list_id);
};

export const getTaskById = (tasks: ResponseTaskResponse[], id: string) => {
  return tasks.find((task) => task.id === id);
};

export const initializeBoard = (
  tasks: ResponseTaskResponse[],
  sections: ResponseTaskListResponse[],
) => {
  const boardSections: BoardSections = {};
  const sectionObjs = getBoardSections(sections);

  Object.keys(sectionObjs).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(tasks, boardSectionKey);
  });

  return boardSections;
};

export const findBoardSectionContainer = (boardSections: BoardSections, id: string) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id),
  );
  return container;
};

export const fKeySection = (value?: string) => {
  if (!value) return '';
  return value.toLocaleLowerCase().replace(' ', '_');
};
