import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import { useGetAuthProjectsProjectIdTasks } from '@/app/api/task/task';
import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
  useContext,
} from 'react';
import { ProjectContext } from './ProjectProvider';

type State = {
  page: number;
  page_size: number;
  tasks: ResponseTaskResponse[];
  total: number;
  total_pages: number;
};

type Action =
  | { type: 'ADD_TASK'; payload: ResponseTaskResponse }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'INIT'; payload: State }
  | { type: 'UPDATE_TASK'; payload: ResponseTaskResponse };

const initialState: State = {
  tasks: [],
  page: 0,
  page_size: 0,
  total: 0,
  total_pages: 0,
};

function tasksReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'INIT':
      return { ...state, ...action.payload };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        ),
      };
    default:
      return state;
  }
}

type TasksContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const TasksContext = createContext<TasksContextType>({
  dispatch: () => undefined,
  state: initialState,
});

type Props = { children: ReactNode; id: string };

export const TasksProvider = ({ children, id }: Props) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const { project } = useContext(ProjectContext);
  const { data: taskData } = useGetAuthProjectsProjectIdTasks(
    id,
    {
      page: 1,
      page_size: 10,
      sprint_id: project?.sprint_active?.id,
    },
    { query: { select: (data) => data.data, enabled: !!project?.sprint_active?.id } },
  );

  useEffect(() => {
    dispatch({
      type: 'INIT',
      payload: {
        page: taskData?.page || 0,
        page_size: taskData?.page_size || 0,
        total_pages: taskData?.total_pages || 0,
        total: taskData?.total || 0,
        tasks: taskData?.tasks || [],
      },
    });
  }, [taskData]);

  return <TasksContext.Provider value={{ state, dispatch }}>{children}</TasksContext.Provider>;
};
