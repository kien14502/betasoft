import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

type Project = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
};

type Workspace = {
  id: string;
  name: string;
  description?: string;
  projects: Project[];
  createdAt: string;
  updatedAt?: string;
};

export type WorkspaceState = {
  workspaces: Workspace[];
  activeWorkspaceId?: string | null;
  loading: boolean;
  error?: string | null;
};

const STORAGE_KEY = 'app:workspaces';

const loadState = (): WorkspaceState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { workspaces: [], activeWorkspaceId: null, loading: false, error: null };
    }
    return JSON.parse(raw) as WorkspaceState;
  } catch {
    return { workspaces: [], activeWorkspaceId: null, loading: false, error: null };
  }
};

const persist = (state: WorkspaceState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore persist errors
  }
};

const initialState: WorkspaceState = loadState();

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    addWorkspace: {
      prepare(payload: { name: string; description?: string }) {
        const id = nanoid();
        const now = new Date().toISOString();
        return {
          payload: {
            id,
            name: payload.name,
            description: payload.description,
            createdAt: now,
          },
        };
      },
      reducer(
        state,
        action: PayloadAction<{
          id: string;
          name: string;
          description?: string;
          createdAt: string;
        }>,
      ) {
        state.workspaces.push({
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          projects: [],
          createdAt: action.payload.createdAt,
        });
        state.activeWorkspaceId = state.activeWorkspaceId ?? action.payload.id;
        persist(state);
      },
    },

    renameWorkspace(state, action: PayloadAction<{ id: string; name: string }>) {
      const w = state.workspaces.find((ws) => ws.id === action.payload.id);
      if (w) {
        w.name = action.payload.name;
        w.updatedAt = new Date().toISOString();
        persist(state);
      }
    },

    removeWorkspace(state, action: PayloadAction<{ id: string }>) {
      const idx = state.workspaces.findIndex((ws) => ws.id === action.payload.id);
      if (idx >= 0) {
        state.workspaces.splice(idx, 1);
        if (state.activeWorkspaceId === action.payload.id) {
          state.activeWorkspaceId = state.workspaces.length ? state.workspaces[0].id : null;
        }
        persist(state);
      }
    },

    setActiveWorkspace(state, action: PayloadAction<{ id?: string | null }>) {
      state.activeWorkspaceId = action.payload.id ?? null;
      persist(state);
    },

    addProject: {
      prepare(payload: { workspaceId: string; name: string; description?: string }) {
        const id = nanoid();
        const now = new Date().toISOString();
        return {
          payload: {
            ...payload,
            project: {
              id,
              name: payload.name,
              description: payload.description,
              createdAt: now,
            } as Project,
          },
        };
      },
      reducer(state, action: PayloadAction<{ workspaceId: string; project: Project }>) {
        const ws = state.workspaces.find((w) => w.id === action.payload.workspaceId);
        if (!ws) return;
        ws.projects.push(action.payload.project);
        ws.updatedAt = new Date().toISOString();
        persist(state);
      },
    },

    updateProject(
      state,
      action: PayloadAction<{
        workspaceId: string;
        projectId: string;
        changes: Partial<Omit<Project, 'id' | 'createdAt'>>;
      }>,
    ) {
      const ws = state.workspaces.find((w) => w.id === action.payload.workspaceId);
      if (!ws) return;
      const p = ws.projects.find((proj) => proj.id === action.payload.projectId);
      if (!p) return;
      if (action.payload.changes.name !== undefined) p.name = action.payload.changes.name;
      if (action.payload.changes.description !== undefined)
        p.description = action.payload.changes.description;
      p.updatedAt = new Date().toISOString();
      ws.updatedAt = new Date().toISOString();
      persist(state);
    },

    removeProject(state, action: PayloadAction<{ workspaceId: string; projectId: string }>) {
      const ws = state.workspaces.find((w) => w.id === action.payload.workspaceId);
      if (!ws) return;
      const idx = ws.projects.findIndex((p) => p.id === action.payload.projectId);
      if (idx >= 0) {
        ws.projects.splice(idx, 1);
        ws.updatedAt = new Date().toISOString();
        persist(state);
      }
    },

    moveProject(
      state,
      action: PayloadAction<{ fromWorkspaceId: string; toWorkspaceId: string; projectId: string }>,
    ) {
      const from = state.workspaces.find((w) => w.id === action.payload.fromWorkspaceId);
      const to = state.workspaces.find((w) => w.id === action.payload.toWorkspaceId);
      if (!from || !to) return;
      const idx = from.projects.findIndex((p) => p.id === action.payload.projectId);
      if (idx < 0) return;
      const [proj] = from.projects.splice(idx, 1);
      to.projects.push(proj);
      from.updatedAt = new Date().toISOString();
      to.updatedAt = new Date().toISOString();
      persist(state);
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      persist(state);
    },

    resetWorkspaces(state) {
      state.workspaces = [];
      state.activeWorkspaceId = null;
      state.loading = false;
      state.error = null;
      persist(state);
    },
  },
});

export const {
  addWorkspace,
  renameWorkspace,
  removeWorkspace,
  setActiveWorkspace,
  addProject,
  updateProject,
  removeProject,
  moveProject,
  setLoading,
  setError,
  resetWorkspaces,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
