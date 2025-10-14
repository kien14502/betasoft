import { Task } from '@/app/[ws_id]/(dashboard)/tasks/(kanban)/KanbanBoard';
import { ActionType } from '../constants';
import { TModeModalTask } from '@/app/[ws_id]/(dashboard)/tasks/ModalAddTask';

export const SET_ACTIVE_MENU_MODAL_ADD_TASK = 'set_active_modal_add_task';
export const SET_STATE_TASK = 'set_state_task';
export const SET_MODE_TASK = 'set_mode_task';
export const SET_TASK = 'set_task';
export const SET_TASKS = 'set_tasks';
export const ADD_TASK = 'add_task';
export const DELETE_TASK = 'delete_task';

export type TKanbanState = {
  stateTask?: string;
  modeTask: string;
  task?: Task;
  tasks: Task[];
  isActiveModalAddTask: boolean;
};

export const initKanbanState: TKanbanState = {
  task: undefined,
  stateTask: undefined,
  modeTask: 'add',
  tasks: [],
  isActiveModalAddTask: false,
};

export const kanbanActions = {
  setActiveModalAddTask: (payload: boolean) => ({
    type: SET_ACTIVE_MENU_MODAL_ADD_TASK,
    payload,
  }),

  setTask: (payload: Task | undefined) => ({
    type: SET_TASK,
    payload,
  }),

  setStateTask: (payload: string) => ({
    type: SET_STATE_TASK,
    payload,
  }),

  setModeTask: (payload: TModeModalTask) => ({
    type: SET_MODE_TASK,
    payload,
  }),

  setTasks: (payload: Task[]) => ({
    type: SET_TASKS,
    payload,
  }),

  addTask: (payload: Task) => ({
    type: ADD_TASK,
    payload,
  }),

  deleteTask: (payload: Task) => ({
    type: DELETE_TASK,
    payload,
  }),
};

export function kanbanReducer(state: TKanbanState, action: ActionType): TKanbanState {
  switch (action.type) {
    case SET_ACTIVE_MENU_MODAL_ADD_TASK:
      return { ...state, isActiveModalAddTask: action.payload };
    case SET_STATE_TASK:
      return { ...state, stateTask: action.payload };
    case SET_MODE_TASK:
      return { ...state, modeTask: action.payload };
    case SET_TASK:
      return { ...state, task: action.payload };
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.key !== action.payload.key),
      };
    default:
      return state;
  }
}
